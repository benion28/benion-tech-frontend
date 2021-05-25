import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-new-login-user',
  templateUrl: './new-login-user.component.html',
  styleUrls: ['./new-login-user.component.css']
})
export class NewLoginUserComponent implements OnInit {
  adminAccess = {
    adminLogin: false,
    showLogo: true,
    adminForgetPassword: false,
    userForgetPassword: false
  };

  constructor(
    public usersService: UsersService,
    public notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<NewLoginUserComponent>
  ) {}

  ngOnInit(): void {}

  onUserSignUpSubmit() {
    if (this.usersService.userSignUpForm.valid) {
      if (!this.usersService.userSignUpForm.get('_id').value) {
        if (
          this.usersService.validateSignUpPasswords(
            this.usersService.userSignUpForm.value
          )
        ) {
          this.usersService.registerLoginUser(
            this.usersService.userSignUpForm.value
          );
          this.usersService.userSignUpForm.reset();
          this.usersService.initializeUserSignUpFormGroup();
          this.onUserSignUpClose();
        } else {
          this.notificationsService.warn(':: Passwords Do Not Match ::');
        }
      } else {
        if (this.usersService.adminUser.username !== null) {
          this.usersService.upDateLoginUser(
            this.usersService.userSignUpForm.value
          );
          this.usersService.userSignUpForm.reset();
          this.usersService.initializeUserSignUpFormGroup();
          this.onUserSignUpClose();
        }
      }
    }
  }

  onUserSignUpClose() {
    this.usersService.userSignUpForm.reset();
    this.usersService.initializeUserSignUpFormGroup();
    this.dialogRef.close();
  }

  onUserSignUpClear() {
    this.usersService.userSignUpForm.reset();
    this.usersService.initializeUserSignUpFormGroup();
  }

  onUsersLogin() {
    if (this.usersService.userSignInForm.valid) {
      this.usersService.userLogIn(this.usersService.userSignInForm.value);
      this.usersService.userSignInForm.reset();
      this.usersService.initializeUserSignInForm();
    }
  }

  onAdminLogin() {
    if (this.usersService.adminSignInForm.valid) {
      this.usersService.adminLogIn(this.usersService.adminSignInForm.value);
      this.usersService.adminSignInForm.reset();
      this.usersService.initializeAdminSignInForm();
    }
  }

  loginAccess() {
    if (this.adminAccess.showLogo) {
      this.adminAccess = {
        adminLogin: !this.adminAccess.adminLogin,
        showLogo: this.adminAccess.showLogo,
        userForgetPassword: this.adminAccess.userForgetPassword,
        adminForgetPassword: this.adminAccess.adminForgetPassword
      };
    } else {
      this.adminAccess = {
        adminLogin: !this.adminAccess.adminLogin,
        showLogo: !this.adminAccess.showLogo,
        userForgetPassword: this.adminAccess.userForgetPassword,
        adminForgetPassword: this.adminAccess.adminForgetPassword
      };
    }
  }

  forgetUserAccess() {
    this.adminAccess = {
      adminLogin: this.adminAccess.adminLogin,
      showLogo: this.adminAccess.showLogo,
      userForgetPassword: !this.adminAccess.userForgetPassword,
      adminForgetPassword: this.adminAccess.adminForgetPassword
    };
  }

  forgetAdminAccess() {
    this.adminAccess = {
      adminLogin: this.adminAccess.adminLogin,
      showLogo: this.adminAccess.showLogo,
      userForgetPassword: this.adminAccess.userForgetPassword,
      adminForgetPassword: !this.adminAccess.adminForgetPassword
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

  onAdminForgetPassword() {
    if (this.usersService.adminSignInForm.valid) {
      this.usersService.forgetAdminPassword(
        this.usersService.adminSignInForm.value
      );
      this.usersService.adminSignInForm.reset();
      this.usersService.initializeAdminForgetPasswordForm();
    }
  }

  onShowLogo() {
    this.adminAccess = {
      adminLogin: this.adminAccess.adminLogin,
      showLogo: !this.adminAccess.showLogo,
      userForgetPassword: this.adminAccess.userForgetPassword,
      adminForgetPassword: this.adminAccess.adminForgetPassword
    };
  }
}
