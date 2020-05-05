import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TopStoriesService {
  topStoriesList: AngularFireList<any>;
  topStories = [];

  constructor(private firebase: AngularFireDatabase) {
    this.topStoriesList = this.firebase.list('topStoriesNews');
    this.topStoriesList.snapshotChanges().subscribe(list => {
      this.topStories = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });
  }

  topStoriesForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  initializeFormGroupTopStories() {
    this.topStoriesForm.setValue({
      $key: null,
      title: '',
      details: '',
      isView: false
    });
  }

  getTopStories() {
    return this.topStoriesList.snapshotChanges();
  }

  insertTopStories(news) {
    this.topStoriesList.push({
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  updateTopStories(news) {
    this.topStoriesList.update(news.$key, {
      title: news.title,
      details: news.details,
      isView: false
    });
  }

  deleteTopStories($key: string) {
    this.topStoriesList.remove($key);
  }

  populateTopStoriesForm(news) {
    this.topStoriesForm.setValue(news);
  }
}
