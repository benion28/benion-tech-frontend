import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class EntertainmentService {
  entertainmentList: AngularFireList<any>;
  entertainment = [];

  constructor(private firebase: AngularFireDatabase) {
    this.entertainmentList = this.firebase.list('entertainmentNews');
    this.entertainmentList.snapshotChanges().subscribe(list => {
      this.entertainment = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  entertainmentForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  initializeFormGroupEntertainment() {
    this.entertainmentForm.setValue({
      $key: null,
      title: '',
      details: '',
      isView: false
    });
  }

  getEntertainment() {
    return this.entertainmentList.snapshotChanges();
  }

  insertEntertainment(news) {
    this.entertainmentList.push({
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  updateEntertainment(news) {
    this.entertainmentList.update(news.$key, {
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  deleteEntertainment($key: string) {
    this.entertainmentList.remove($key);
  }

  populateEntertainmentForm(news) {
    this.entertainmentForm.setValue(news);
  }
}
