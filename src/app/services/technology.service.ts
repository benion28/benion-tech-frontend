import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {
  technologyList: AngularFireList<any>;
  technology = [];

  constructor(private firebase: AngularFireDatabase) {
    this.technologyList = this.firebase.list('technologyNews');
    this.technologyList.snapshotChanges().subscribe(list => {
      this.technology = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  technologyForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  initializeFormGroupTechnology() {
    this.technologyForm.setValue({
      $key: null,
      title: '',
      details: '',
      isView: false
    });
  }

  getTechnology() {
    return this.technologyList.snapshotChanges();
  }

  insertTechnology(news) {
    this.technologyList.push({
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  updateTechnology(news) {
    this.technologyList.update(news.$key, {
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  deleteTechnology($key: string) {
    this.technologyList.remove($key);
  }

  populateTechnologyForm(news) {
    this.technologyForm.setValue(news);
  }
}
