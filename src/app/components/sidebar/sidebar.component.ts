import { Component, OnInit } from '@angular/core';
import { TimeService } from 'src/app/services/time.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewLoginUserComponent } from '../new-login-user/new-login-user.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    public timeService: TimeService,
    public usersService: UsersService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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

  onCreate() {
    this.usersService.initializeUserSignUpFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewLoginUserComponent, dialogConfig);
  }

  onActivateUser() {
    if (this.usersService.activateUserForm.valid) {
      this.usersService.activateLoginUser(
        this.usersService.activateUserForm.value
      );
      this.usersService.activateUserForm.reset();
      this.usersService.initializeActivateUserForm();
    }
  }

  onActivateAdmin() {
    if (this.usersService.activateAdminForm.valid) {
      this.usersService.activateAdminUser(
        this.usersService.activateAdminForm.value
      );
      this.usersService.activateAdminForm.reset();
      this.usersService.initializeActivateAdminForm();
    }
  }

  onChangeUserPassword() {
    if (this.usersService.userChangePasswordForm.valid) {
      this.usersService.loginUserPasswordChange(
        this.usersService.userChangePasswordForm.value
      );
      this.usersService.userChangePasswordForm.reset();
      this.usersService.initializeUserChangePasswordForm();
    }
  }

  onChangeAdminPassword() {
    if (this.usersService.adminChangePasswordForm.valid) {
      this.usersService.adminUserPasswordChange(
        this.usersService.adminChangePasswordForm.value
      );
      this.usersService.adminChangePasswordForm.reset();
      this.usersService.initializeAdminChangePasswordForm();
    }
  }

}
