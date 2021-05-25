import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MapService } from './../../services/map.service';

/// <reference types="@types/googlemaps" />
declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  coordinates = [];
  defaultCoordinate = [];

  mapControl: any = {
    title: 'Benion First AGM Project',
    latitude: 51.678418,
    longitude: 7.809007,
    zoom: 13
  };

  constructor(
    public mapService: MapService,
    public usersService: UsersService
    ) { }

  ngOnInit(): void {
    let array = [];

    this.mapService.getCoordinates().subscribe(list => {
      array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.coordinates = array.reverse();
      this.coordinates.forEach(coordinate => {
        coordinate.latitude = Number(coordinate.latitude);
        coordinate.longitude = Number(coordinate.longitude);
      });
      this.defaultCoordinate = this.coordinates.filter(coordinate => coordinate.title === 'Default');
      if (this.defaultCoordinate !== null) {
        this.mapControl = {
          title: 'Benion Google Map',
          latitude: Number(this.defaultCoordinate[0].latitude),
          longitude: Number(this.defaultCoordinate[0].longitude),
          zoom: 16
        };
      }
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

  checkCategory(category) {
    if (category === 'House') {
      return 'https://fonts.gstatic.com/s/i/materialicons/home/v11/24px.svg';
    } else if (category === 'School') {
      return 'https://fonts.gstatic.com/s/i/materialicons/next_week/v12/24px.svg';
    } else if (category === 'Farm') {
      return 'https://fonts.gstatic.com/s/i/materialicons/group_work/v10/24px.svg';
    } else if (category === 'Others') {
      return 'https://fonts.gstatic.com/s/i/materialicons/wysiwyg/v6/24px.svg';
    }
  }

}
