import { NotificationsService } from './../../services/notifications.service';
import { UsersService } from 'src/app/services/users.service';
import { DialogService } from './../../services/dialog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  adminUsers = [];
  loginUsers = [];
  totalAdminUsers;
  totalLoginUsers;

  constructor(
    public usersService: UsersService,
    private dialog: MatDialog,
    public notificationService: NotificationsService,
    private dialogService: DialogService
    ) { }

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
      this.adminUsers = users.data;
      this.listDataAdmin = new MatTableDataSource(this.adminUsers);
      this.totalAdminUsers = this.adminUsers.length;
      this.listDataAdmin.sort = this.sort;
      this.listDataAdmin.paginator = this.paginator;
      this.listDataAdmin.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;
        });
    };
    });

    this.usersService.getLoginUsers().subscribe(users => {
      this.loginUsers = users.data;
      this.listDataLogin = new MatTableDataSource(this.loginUsers);
      this.totalLoginUsers = this.loginUsers.length;
      this.listDataLogin.sort = this.sort;
      this.listDataLogin.paginator = this.paginator;
      this.listDataLogin.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return element !== 'actions' && data[element].toLowerCase().indexOf(filter) !== -1;
        });
    };
    });

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
    this.dialogService.openConfirmDialog('Are You Sure You Want To Delete This Record ?').afterClosed().subscribe(response => {
      if (response) {
        // Delete In The UI
        this.adminUsers = this.adminUsers.filter(adminUser => adminUser._id !== user._id);
        // Delete On The Server
        this.usersService.deleteAdminUser(user).subscribe();
        this.notificationService.warn(' !! It Has Been Deleted Successfully !!! ');
      }
    });
  }

  onDeleteLoginUser(user) {
    this.dialogService.openConfirmDialog('Are You Sure You Want To Delete This Record ?').afterClosed().subscribe(response => {
      if (response) {
        // Delete In The UI
        this.loginUsers = this.loginUsers.filter(loginUser => loginUser._id !== user._id);
        // Delete On The Server
        this.usersService.deleteLoginUser(user).subscribe();
        this.notificationService.warn(' !! It Has Been Deleted Successfully !!! ');
      }
    });
  }

  onLoginSort() {
    this.loginUsers = this.loginUsers.sort();
  }

  onAdminSort() {
    this.adminUsers = this.adminUsers.sort();
  }

}
