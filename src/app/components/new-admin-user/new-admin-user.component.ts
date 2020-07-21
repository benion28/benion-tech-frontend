import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-admin-user',
  templateUrl: './new-admin-user.component.html',
  styleUrls: ['./new-admin-user.component.css']
})
export class NewAdminUserComponent implements OnInit {

  adminAccess = {
    showLogo: true,
    adminForgetPassword: false,
    userForgetPassword: false
  };

  constructor(
    public usersService: UsersService,
    public notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<NewAdminUserComponent>) { }

  ngOnInit(): void {
  }

  onAdminSignUpSubmit() {
    if (this.usersService.adminSignUpForm.valid) {
      if (!this.usersService.adminSignUpForm.get('_id').value) {
        if (this.usersService.validateSignUpPasswords(this.usersService.adminSignUpForm.value)) {
          this.usersService.registerAdminUser(this.usersService.adminSignUpForm.value);
          this.usersService.adminSignUpForm.reset();
          this.usersService.initializeAdminSignUpFormGroup();
          this.onAdminSignUpClose();
        } else {
          this.notificationsService.warn(':: Passwords Do Not Match ::');
        }
      } else {
        if (this.usersService.adminUser.username !== null) {
          this.usersService.upDateAdminUser(this.usersService.adminSignUpForm.value);
          this.usersService.adminSignUpForm.reset();
          this.usersService.initializeAdminSignUpFormGroup();
          this.notificationsService.success(':: User Has Been Updated Successfully ::');
          this.onAdminSignUpClose();
        }
      }
    }
  }

  onAdminSignUpClose() {
    this.usersService.adminSignUpForm.reset();
    this.usersService.initializeAdminSignUpFormGroup();
    this.dialogRef.close();
  }

  onAdminSignUpClear() {
    this.usersService.adminSignUpForm.reset();
    this.usersService.initializeAdminSignUpFormGroup();
  }

  onUsersLogin() {
    if (this.usersService.userSignInForm.valid) {
      this.usersService.userLogIn(this.usersService.userSignInForm.value);
      this.usersService.userSignInForm.reset();
      this.usersService.initializeUserSignInForm();
    }
  }

  forgetUserAccess() {
    this.adminAccess = {
      showLogo: this.adminAccess.showLogo,
      userForgetPassword: !this.adminAccess.userForgetPassword,
      adminForgetPassword: this.adminAccess.adminForgetPassword
    };
  }

  onUsersForgetPassword() {
    if (this.usersService.userForgetPasswordForm.valid) {
      this.usersService.forgetLoginPassword(
        this.usersService.userForgetPasswordForm.value
      );
      this.usersService.userForgetPasswordForm.reset();
      this.usersService.initializeUserForgetPasswordForm();
    }
  }

  onShowLogo() {
    this.adminAccess = {
      showLogo: !this.adminAccess.showLogo,
      userForgetPassword: this.adminAccess.userForgetPassword,
      adminForgetPassword: this.adminAccess.adminForgetPassword
    };
  }

}
