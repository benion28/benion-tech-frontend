import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MapService } from './../../services/map.service';
import { DialogService } from './../../services/dialog.service';
import { NotificationsService } from './../../services/notifications.service';
import { NewCoordinateComponent } from './../new-coordinate/new-coordinate.component';
import { UsersService } from './../../services/users.service';

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent implements OnInit {

  checkCoordinate = false;

  mapControl: any = {
    title: 'My first AGM project',
    latitude: 51.678418,
    longitude: 7.809007,
    viewMap: true
  };

  constructor(
    private dialog: MatDialog,
    public mapService: MapService,
    public notificationService: NotificationsService,
    public dialogService: DialogService,
    public usersService: UsersService
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'check',
    '$key',
    'title',
    'longitude',
    'latitude',
    'altitude',
    'category',
    'actions'
  ];

  array = [];
  totalCoordinates;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    let coordinates = [];

    this.mapService.getCoordinates().subscribe(list => {
      coordinates = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.array = coordinates.reverse();
      this.listData = new MatTableDataSource(this.array);
      this.totalCoordinates = this.array.length;
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
    this.mapService.initializeFormGroupCoordinate();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    this.dialog.open(NewCoordinateComponent, dialogConfig);
  }

  onEdit(row) {
    this.mapService.populateCoordinateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    this.dialog.open(NewCoordinateComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.mapService.deleteCoordinate($key);
          this.notificationService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  selectAll() {
    if (!this.checkCoordinate) {
      this.array.forEach(contact => {
        contact.isWorking = true;
      });
      this.checkCoordinate = true;
    } else {
      this.array.forEach(contact => {
        contact.isWorking = false;
      });
      this.checkCoordinate = false;
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

  onEditCoordinate(coordinate) {
    this.mapService.populateCoordinateForm(coordinate);
  }

  onDeleteCoordinate($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.mapService.deleteCoordinate($key);
          this.notificationService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  toogleView() {
    this.mapControl = {
      title: this.mapControl.title,
      latitude: this.mapControl.latitude,
      longitude: this.mapControl.longitude,
      viewMap: !this.mapControl.viewMap
    };
  }

}
