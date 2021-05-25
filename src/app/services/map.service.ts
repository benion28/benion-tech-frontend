import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  coordinatesList: AngularFireList<any>;
  coordinates = [];

  constructor(private firebase: AngularFireDatabase) {
    let coordinates = [];

    this.getCoordinates().subscribe(list => {
      coordinates = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.coordinates = coordinates.reverse();
    });
  }

  coordinateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('', Validators.required),
    longitude: new FormControl('', Validators.required),
    latitude: new FormControl('', Validators.required),
    altitude: new FormControl(''),
    category: new FormControl('Others', Validators.required)
  });

  initializeFormGroupCoordinate() {
    this.coordinateForm.setValue({
      $key: null,
      title: '',
      longitude: '',
      latitude: '',
      altitude: '',
      category: ''
    });
  }

  getCoordinates() {
    this.coordinatesList = this.firebase.list('coordinates');
    return this.coordinatesList.snapshotChanges();
  }

  insertCoordinate(coordinate) {
    this.coordinatesList.push({
      title: coordinate.title,
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
      altitude: coordinate.altitude,
      category: coordinate.category
    });
  }

  setCoordinate(coordinate) {
    this.coordinates.push({
      title: coordinate.title,
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
      altitude: coordinate.altitude,
      category: coordinate.category
    });
  }

  updateCoordinate(coordinate) {
    this.coordinatesList.update(coordinate.$key, {
      title: coordinate.title,
      longitude: coordinate.longitude,
      latitude: coordinate.latitude,
      altitude: coordinate.altitude,
      category: coordinate.category
    });
  }

  deleteCoordinate($key: string) {
    this.coordinatesList.remove($key);
  }

  populateCoordinateForm(coordinate) {
    this.coordinateForm.setValue(coordinate);
  }
}
