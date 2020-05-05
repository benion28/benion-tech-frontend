import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  arrays = [];

  constructor(private firebase: AngularFireDatabase) {}

  contactList: AngularFireList<any>;

  contactForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(8)]),
    birthday: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    city: new FormControl(''),
    gender: new FormControl('g0'),
    school: new FormControl('', Validators.required),
    department: new FormControl('d0'),
    isWorking: new FormControl(false)
  });

  initializeFormGroup() {
    this.contactForm.setValue({
      $key: null,
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      mobile: '',
      birthday: '',
      password: '',
      city: '',
      gender: 'g0',
      school: '',
      department: 'd0',
      isWorking: false
    });
  }

  getContacts() {
    this.contactList = this.firebase.list('users');
    return this.contactList.snapshotChanges();
  }

  setContacts(contact) {
    this.arrays.push({
      firstName: contact.firstName,
      lastName: contact.lastName,
      userName: contact.userName,
      email: contact.email,
      mobile: contact.mobile,
      birthday: contact.birthday,
      password: contact.password,
      city: contact.city,
      gender: contact.gender,
      school: contact.school,
      department: contact.department,
      isWorking: contact.isWorking
    });
  }

  insertContact(contact) {
    this.contactList.push({
      firstName: contact.firstName,
      lastName: contact.lastName,
      userName: contact.userName,
      email: contact.email,
      mobile: contact.mobile,
      birthday: contact.birthday,
      password: contact.password,
      city: contact.city,
      gender: contact.gender,
      school: contact.school,
      department: contact.department,
      isWorking: contact.isWorking
    });
  }

  updateContact(contact) {
    this.contactList.update(contact.$key, {
      firstName: contact.firstName,
      lastName: contact.lastName,
      userName: contact.userName,
      email: contact.email,
      mobile: contact.mobile,
      birthday: contact.birthday,
      password: contact.password,
      city: contact.city,
      gender: contact.gender,
      school: contact.school,
      department: contact.department,
      isWorking: contact.isWorking
    });
  }

  deleteContact($key: string) {
    this.contactList.remove($key);
  }

  populateForm(contact) {
    this.contactForm.setValue(_.omit(contact, 'departmentName'));
  }

  updateCheck(contact) {
    if (contact.isWorking) {
      this.contactList.update(contact.$key, {
        isWorking: false
      });
    } else {
      this.contactList.update(contact.$key, {
        isWorking: true
      });
    }
  }
}
