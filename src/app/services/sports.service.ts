import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class SportsService {
  sportsList: AngularFireList<any>;
  sports = [];

  constructor(private firebase: AngularFireDatabase) {
    this.sportsList = this.firebase.list('sportsNews');
    this.sportsList.snapshotChanges().subscribe(list => {
      this.sports = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  sportsForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  initializeFormGroupSports() {
    this.sportsForm.setValue({
      $key: null,
      title: '',
      details: '',
      isView: false
    });
  }

  getSports() {
    return this.sportsList.snapshotChanges();
  }

  insertSports(news) {
    this.sportsList.push({
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  updateSports(news) {
    this.sportsList.update(news.$key, {
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  deleteSports($key: string) {
    this.sportsList.remove($key);
  }

  populateSportsForm(news) {
    this.sportsForm.setValue(news);
  }
}
