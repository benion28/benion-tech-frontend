import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from 'src/app/services/departments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.css']
})
export class NewContactComponent implements OnInit {

  constructor(
    public contactsService: ContactsService,
    public departmentsService: DepartmentsService,
    public notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<NewContactComponent>
    ) { }

  ngOnInit(): void {
    this.contactsService.getContacts();
  }
  onClear() {
    this.contactsService.contactForm.reset();
    this.contactsService.initializeFormGroup();
  }

  onSubmit() {
    if (this.contactsService.contactForm.valid) {
      if (!this.contactsService.contactForm.get('$key').value) {
        this.contactsService.insertContact(this.contactsService.contactForm.value);
        this.contactsService.contactForm.reset();
        this.contactsService.initializeFormGroup();
        this.contactsService.setContacts(this.contactsService.contactForm.value);
        this.notificationsService.success(':: Has Been Submitted Successfully ::');
      } else {
        this.contactsService.updateContact(this.contactsService.contactForm.value);
        this.contactsService.contactForm.reset();
        this.contactsService.initializeFormGroup();
        this.notificationsService.success(':: Has Been Updated Successfully ::');
      }
      this.onClose();
    }
  }

  onClose() {
    this.contactsService.contactForm.reset();
    this.contactsService.initializeFormGroup();
    this.dialogRef.close();
  }


}
