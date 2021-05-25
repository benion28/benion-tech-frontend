import { ContactsService } from 'src/app/services/contacts.service';
import { fadeAnimation } from './../../fade-animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { DepartmentsService } from 'src/app/services/departments.service';

class Contacts {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [fadeAnimation]
})
export class ContactsComponent implements OnInit {
  // Contacts List
  contactsData = [];
  totalContacts;

  // Contacts List
  displayedColumns: string[] = [
    'actions',
    'firstName',
    'lastName',
    'departmentName',
    'city'
  ];

  dataSource: MatTableDataSource<object>;

  length = 100;
  pageIndex = 0;
  pageSize = 20;
  pageSizeOptions = [1, 2, 5, 10, 20];

  // Contacts List
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageEvent: PageEvent;

  constructor(
    public contactsService: ContactsService,
    public departmentService: DepartmentsService
    ) {}

  // Contacts List
  onPageChange(event) {
    const previousPageIndex = event.previousPageIndex;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(pageIndex, pageSize) {
    this.dataSource = new MatTableDataSource<object>(
      this.contactsData.slice(pageIndex, pageIndex + pageSize)
    );
  }

  ngOnInit(): void {
    let departments = [];
    this.departmentService.getDepartments().subscribe(
      list => {
        departments = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
    this.contactsService.getContacts().subscribe(
      list => {
        this.contactsData = list.map(item => {
          const filteredDepartment = departments.filter(
            department => item.payload.val().department.trim() === department.$key.trim()
          );
          return {
            $key: item.key,
            departmentName: filteredDepartment[0].name,
            ...item.payload.val()
          };
        });
        this.dataSource = new MatTableDataSource(this.contactsData);
        this.loadData(0, this.pageSize);
        this.dataSource.sort = this.sort;
        this.totalContacts = this.contactsData.length;
        this.contactsData.sort();
      }
    );
  }

  // Contacts List
  selectAll() {
    for (const element of this.contactsData) {
      element.isChecked = !element.isChecked;
    }
  }
}
