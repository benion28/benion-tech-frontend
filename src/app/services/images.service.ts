import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { ContactsService } from './contacts.service';
import { NotificationsService } from './notifications.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  othersImages = [];
  worksImages = [];
  contactsImages = [];

  task: AngularFireUploadTask;
  progressPercentage: Observable<number>;
  uploadPercent: number;

  galleryImagesList: AngularFireList<any>;

  constructor(
    private storage: AngularFireStorage,
    public contactsService: ContactsService,
    public notificationsService: NotificationsService,
    private firebase: AngularFireDatabase
  ) {
    let images = [];

    this.getImages().subscribe(list => {
      images = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.worksImages = images.filter(image => image.category === 'Works');
    });

    this.getImages().subscribe(list => {
      images = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.othersImages = images.filter(image => image.category === 'Others');
    });

    this.contactsService.getContacts().subscribe(list => {
      this.contactsImages = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  galleryImagesForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    image: new FormControl('', Validators.required),
    caption: new FormControl('', Validators.required),
    link: new FormControl(''),
    category: new FormControl('Others')
  });

  initializeGalleryImagesForm() {
    this.galleryImagesForm.setValue({
      $key: null,
      image: '',
      caption: '',
      link: '',
      category: 'Others'
    });
  }

  getGalleryImages() {
    return this.galleryImagesList.snapshotChanges();
  }

  insertGalleryImages(details) {
    this.galleryImagesList.push({
      image: details.image,
      caption: details.caption,
      link: details.link,
      category: details.category
    });
  }

  deleteGalleryImage($key: string) {
    this.galleryImagesList.remove($key);
  }

  uploadContactImage(contact, imageSrc): Observable<number> {
    const filePath = `Contacts/${ contact.firstName.toLowerCase() + '-' + contact.userName.toLowerCase() + '-' + contact.lastName.toLowerCase() }_${ new Date().getTime() }`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, imageSrc).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          contact.image = url;
          this.contactsService.insertContact(contact);
          this.contactsService.contactForm.reset();
          this.contactsService.initializeFormGroup();
          this.contactsService.setContacts(contact);
          this.notificationsService.success(
            ':: Has Been Submitted Successfully ::'
          );
        });
      })
    ).subscribe();
    // Percentage Monitoring
    return this.task.percentageChanges();
  }

  updateContactImage(contact, imageSrc): Observable<number> {
    const filePath = `Contacts/${ contact.firstName.toLowerCase() + '-' + contact.userName.toLowerCase() + '-' + contact.lastName.toLowerCase() }_${ new Date().getTime() }`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, imageSrc).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          contact.image = url;
          this.contactsService.updateContact(contact);
        });
      })
    ).subscribe();
    // Percentage Monitoring
    return this.task.percentageChanges();
  }

  uploadPercentage(taskPercentage): Observable<number> {
    return taskPercentage;
  }

  updatePercentage(taskPercentage) {
    this.uploadPercentage(taskPercentage).subscribe(
        percentage => {
          this.uploadPercent = Math.round(percentage);
        }
      );
  }

  uploadGalleryImage(details, imageSrc): Observable<number> {
    const filePath = `${ details.category }/${ details.caption }_${ new Date().getTime() }`;
    const fileRef = this.storage.ref(filePath);
    // Main Task
    this.task = this.storage.upload(filePath, imageSrc);
    // Progress Monitoring
    this.progressPercentage = this.task.percentageChanges();
    // Upload Photo
    this.task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          details.image = url;
          this.insertGalleryImages(details);
          this.galleryImagesForm.reset();
          this.initializeGalleryImagesForm();
          this.notificationsService.success(':: Has Been Uploaded Successfully ::');
          this.progressPercentage = null;
        });
      })
    ).subscribe(
      item => {
        // Update Percentage
        this.updatePercentage(this.task.percentageChanges());
        console.log(`Task Subscribe Item: ${ item }`);
      }
    );
    // Percentage Monitoring
    return this.task.percentageChanges();
  }

  getImages() {
    this.galleryImagesList = this.firebase.list('galleryImages');
    return this.galleryImagesList.snapshotChanges();
  }

}
