import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MapService } from './../../services/map.service';
import { NotificationsService } from './../../services/notifications.service';

@Component({
  selector: 'app-new-coordinate',
  templateUrl: './new-coordinate.component.html',
  styleUrls: ['./new-coordinate.component.css']
})
export class NewCoordinateComponent implements OnInit {

  constructor(
    public mapService: MapService,
    public notificationsService: NotificationsService,
    public dialogRef: MatDialogRef<NewCoordinateComponent>
  ) {}

  ngOnInit(): void {
    this.mapService.getCoordinates();
  }

  onSubmit() {
    if (this.mapService.coordinateForm.valid) {
      if (!this.mapService.coordinateForm.get('$key').value) {
        this.mapService.insertCoordinate(
          this.mapService.coordinateForm.value
        );
        this.mapService.coordinateForm.reset();
        this.mapService.initializeFormGroupCoordinate();
        this.mapService.setCoordinate(
          this.mapService.coordinateForm.value
        );
        this.notificationsService.success(
          ':: Has Been Submitted Successfully ::'
        );
      } else {
        this.mapService.updateCoordinate(
          this.mapService.coordinateForm.value
        );
        this.mapService.coordinateForm.reset();
        this.mapService.initializeFormGroupCoordinate();
        this.notificationsService.success(
          ':: Has Been Updated Successfully ::'
        );
      }
      this.onClose();
    }
  }

  onClose() {
    this.mapService.coordinateForm.reset();
    this.mapService.initializeFormGroupCoordinate();
    this.dialogRef.close();
  }

}
