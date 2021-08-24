import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ImagesService } from 'src/app/services/images.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-admin-image-gallery',
  templateUrl: './admin-image-gallery.component.html',
  styleUrls: ['./admin-image-gallery.component.css']
})
export class AdminImageGalleryComponent implements OnInit {
  percentage: number;

  images = {
    image: null,
    selected: null
  };

  constructor(
    public usersService: UsersService,
    public imagesService: ImagesService,
    public notificationsService: NotificationsService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.imagesService.getGalleryImages();

    this.usersService.getAdminAuthorized().subscribe(
      data => {
        this.usersService.checkAuthorization(data);
      },
      error => {
        if (error === 404) {
          this.usersService.checkAuthentication('error');
        }
        if (error) {
          this.usersService.checkAuthentication('server');
        }
      }
    );
  }

  onSubmit() {
    if (this.imagesService.galleryImagesForm.valid) {
      this.imagesService.uploadGalleryImage(this.imagesService.galleryImagesForm.value, this.images.selected).subscribe(
        percentage => {
          this.percentage = Math.round(percentage);
        }
      );
      this.images = {
        image: null,
        selected: null
      };
    }
  }

  showPreview(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (readerEvent: any) =>
        (this.images.image = readerEvent.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.images.selected = event.target.files[0];
    } else {
      this.images = {
        image: null,
        selected: null
      };
    }
  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.imagesService.deleteGalleryImage($key);
          this.notificationsService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }
}
