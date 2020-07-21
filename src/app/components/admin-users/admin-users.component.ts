import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NewLoginUserComponent } from '../new-login-user/new-login-user.component';
import { NewAdminUserComponent } from '../new-admin-user/new-admin-user.component';
import { NotificationsService } from './../../services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogService } from './../../services/dialog.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    private dialog: MatDialog,
    public notificationService: NotificationsService,
    private dialogService: DialogService
  ) {}

  listDataLogin: MatTableDataSource<any>;
  listDataAdmin: MatTableDataSource<any>;
  displayedColumns: string[] = [
    '_id',
    'firstname',
    'lastname',
    'username',
    'city',
    'email',
    'actions'
  ];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  loginSearchKey: string;
  adminSearchKey: string;

  ngOnInit(): void {
    this.usersService.getAdminUsers().subscribe(users => {
      this.usersService.adminUsers = users.data;
      this.listDataAdmin = new MatTableDataSource(this.usersService.adminUsers);
      this.usersService.totalAdminUsers = this.usersService.adminUsers.length;
      this.listDataAdmin.sort = this.sort;
      this.listDataAdmin.paginator = this.paginator;
      this.listDataAdmin.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return (
            element !== 'actions' &&
            data[element].toLowerCase().indexOf(filter) !== -1
          );
        });
      };
    });

    this.usersService.getLoginUsers().subscribe(users => {
      this.usersService.loginUsers = users.data;
      this.listDataLogin = new MatTableDataSource(this.usersService.loginUsers);
      this.usersService.totalLoginUsers = this.usersService.loginUsers.length;
      this.listDataLogin.sort = this.sort;
      this.listDataLogin.paginator = this.paginator;
      this.listDataLogin.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return (
            element !== 'actions' &&
            data[element].toLowerCase().indexOf(filter) !== -1
          );
        });
      };
    });

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

  onAdminSearchClear() {
    this.adminSearchKey = '';
    this.applyAdminFilter();
  }

  onLoginSearchClear() {
    this.loginSearchKey = '';
    this.applyLoginFilter();
  }

  applyLoginFilter() {
    this.listDataLogin.filter = this.loginSearchKey.trim().toLowerCase();
  }

  applyAdminFilter() {
    this.listDataAdmin.filter = this.adminSearchKey.trim().toLowerCase();
  }

  onDeleteAdminUser(user) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          // Delete In The UI
          this.usersService.adminUsers = this.usersService.adminUsers.filter(
            adminUser => adminUser._id !== user._id
          );
          // Delete On The Server
          this.usersService.deleteAdminUser(user).subscribe();
          this.notificationService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  onDeleteLoginUser(user) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          // Delete In The UI
          this.usersService.loginUsers = this.usersService.loginUsers.filter(
            loginUser => loginUser._id !== user._id
          );
          // Delete On The Server
          this.usersService.deleteLoginUser(user).subscribe();
          this.notificationService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  onLoginSort() {
    this.usersService.loginUsers = this.usersService.loginUsers.sort();
  }

  onAdminSort() {
    this.usersService.adminUsers = this.usersService.adminUsers.sort();
  }

  onUserCreate() {
    this.usersService.initializeUserSignUpFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewLoginUserComponent, dialogConfig);
  }

  onAdminCreate() {
    this.usersService.initializeAdminSignUpFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewAdminUserComponent, dialogConfig);
  }

  onUserEdit(row) {
    const editedUser = {
      _id: row._id,
      firstname: row.firstname,
      lastname: row.lastname,
      username: row.username,
      city: row.city,
      email: row.email,
      password: row.password,
      password2: row.password
    };
    this.usersService.populateUserSignUpForm(editedUser);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewLoginUserComponent, dialogConfig);
  }

  onAdminEdit(row) {
    const editedUser = {
      _id: row._id,
      firstname: row.firstname,
      lastname: row.lastname,
      username: row.username,
      city: row.city,
      email: row.email,
      password: row.password,
      password2: row.password
    };
    this.usersService.populateAdminSignUpForm(editedUser);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewAdminUserComponent, dialogConfig);
  }
}
