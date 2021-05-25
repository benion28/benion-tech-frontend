import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/services/contacts.service';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {
  images = {
    image: null,
    selected: null,
    imageClone: null,
    retrieved: null
  };

  constructor(
    public contactsService: ContactsService,
    public departmentsService: DepartmentsService,
    public notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<NewContactComponent>,
    public imagesService: ImagesService
  ) {}

  ngOnInit(): void {
    this.contactsService.getContacts();
    this.images.image = this.contactsService.getImage();
    this.images.retrieved = this.contactsService.getImage();
  }
  onClear() {
    this.contactsService.contactForm.reset();
    this.contactsService.initializeFormGroup();
    this.images.image = null;
  }

  onSubmit() {
    if (this.contactsService.contactForm.valid) {
      const details = this.contactsService.contactForm.value;
      if (!this.contactsService.contactForm.get('$key').value) {
        this.imagesService.uploadContactImage(details, this.images.selected);
        this.images = {
          image: null,
          selected: null,
          imageClone: null,
          retrieved: null
        };
      } else {
        if (this.images.image === this.images.retrieved) {
          this.contactsService.updateContact(details);
          this.images = {
            image: null,
            selected: null,
            imageClone: null,
            retrieved: null
          };
        } else {
          this.imagesService.updateContactImage(details, this.images.selected);
          this.images = {
            image: null,
            selected: null,
            imageClone: null,
            retrieved: null
          };
        }
        this.contactsService.contactForm.reset();
        this.contactsService.initializeFormGroup();
        this.notificationsService.success(
          ':: Has Been Updated Successfully ::'
        );
      }
      this.onClose();
    }
  }

  onClose() {
    this.contactsService.contactForm.reset();
    this.contactsService.initializeFormGroup();
    this.dialogRef.close();
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent: any) => {
        this.images.image = readerEvent.target.result;
        this.images.imageClone = readerEvent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.images.selected = event.target.files[0];
    } else {
      if (this.images.selected === null && this.images.retrieved !== null) {
        this.images.image = this.images.retrieved;
      } else if (this.images.selected !== null) {
        this.images.image = this.images.imageClone;
      } else {
        this.images.image = null;
      }
    }
  }
}
