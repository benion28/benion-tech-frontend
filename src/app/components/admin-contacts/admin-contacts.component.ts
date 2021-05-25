import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ContactsService } from 'src/app/services/contacts.service';
import { DepartmentsService } from 'src/app/services/departments.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NewContactComponent } from '../new-contact/new-contact.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-contacts',
  templateUrl: './admin-contacts.component.html',
  styleUrls: ['./admin-contacts.component.css']
})
export class AdminContactsComponent implements OnInit {
  checkContact = false;

  constructor(
    public contactsService: ContactsService,
    public usersService: UsersService,
    public departmentService: DepartmentsService,
    private dialog: MatDialog,
    public notificationService: NotificationsService,
    private dialogService: DialogService
  ) {}

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'check',
    '$key',
    'firstName',
    'lastName',
    'userName',
    'mobile',
    'school',
    'departmentName',
    'city',
    'email',
    'actions'
  ];

  array = [];
  totalContacts;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    let departments = [];
    this.departmentService.getDepartments().subscribe(list => {
      departments = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
    this.contactsService.getContacts().subscribe(list => {
      this.array = list.map(item => {
        const filteredDepartment = departments.filter(
          department => item.payload.val().department.trim() === department.$key.trim()
        );
        return {
          $key: item.key,
          departmentName: filteredDepartment[0].name,
          ...item.payload.val()
        };
      });
      this.listData = new MatTableDataSource(this.array);
      this.totalContacts = this.array.length;
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(element => {
          return (
            element !== 'actions' &&
            data[element].toLowerCase().indexOf(filter) !== -1
          );
        });
      };
    });

    this.array.forEach(contact => {
      contact.isWorking = false;
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

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.contactsService.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewContactComponent, dialogConfig);
  }

  onEdit(row) {
    this.contactsService.setImage(row.image);
    this.contactsService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75%';
    this.dialog.open(NewContactComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.contactsService.deleteContact($key);
          this.notificationService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  selectAll() {
    if (!this.checkContact) {
      this.array.forEach(contact => {
        contact.isWorking = true;
      });
      this.checkContact = true;
    } else {
      this.array.forEach(contact => {
        contact.isWorking = false;
      });
      this.checkContact = false;
    }
  }

  onCheck(contact) {
    this.array.filter(item => {
      item.$key = contact.$key;
      item.isWorking = !item.isWorking;
    });
  }

  reloadChecks() {
    this.array.forEach(contact => {
      contact.isWorking = false;
    });
  }

  onSort() {
    this.array = this.array.sort();
  }
}
