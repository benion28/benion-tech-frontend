import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  entertainmentList: AngularFireList<any>;
  entertainment = [];

  sportsList: AngularFireList<any>;
  sports = [];

  technologyList: AngularFireList<any>;
  technology = [];

  topStoriesList: AngularFireList<any>;
  topStories = [];

  constructor(private firebase: AngularFireDatabase) {
    let entertainment = [];
    let sports = [];
    let technology = [];
    let topStories = [];

    this.getEntertainment().subscribe(list => {
      entertainment = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.entertainment = entertainment.reverse();
    });

    this.getSports().subscribe(list => {
      sports = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.sports = sports.reverse();
    });

    this.technologyList = this.firebase.list('technologyNews');
    this.getTechnology().subscribe(list => {
      technology = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.technology = technology.reverse();
    });

    this.getTopStories().subscribe(list => {
      topStories = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.topStories = topStories.reverse();
    });
  }

  entertainmentForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    imageSrc: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  sportsForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    imageSrc: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  technologyForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    imageSrc: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  topStoriesForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl(''),
    imageSrc: new FormControl(''),
    details: new FormControl('', Validators.required),
    isView: new FormControl(false)
  });

  initializeFormGroupEntertainment() {
    this.entertainmentForm.setValue({
      $key: null,
      title: '',
      imageSrc: '',
      details: '',
      isView: false
    });
  }

  getEntertainment() {
    this.entertainmentList = this.firebase.list('entertainmentNews');
    return this.entertainmentList.snapshotChanges();
  }

  insertEntertainment(news) {
    this.entertainmentList.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  setEntertainment(news) {
    this.entertainment.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  updateEntertainment(news) {
    this.entertainmentList.update(news.$key, {
      title: news.title,
      imageSrc: news.imageSrc,
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

  initializeFormGroupSports() {
    this.sportsForm.setValue({
      $key: null,
      title: '',
      imageSrc: '',
      details: '',
      isView: false
    });
  }

  getSports() {
    this.sportsList = this.firebase.list('sportsNews');
    return this.sportsList.snapshotChanges();
  }

  insertSports(news) {
    this.sportsList.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  setSports(news) {
    this.sports.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  updateSports(news) {
    this.sportsList.update(news.$key, {
      title: news.title,
      imageSrc: news.imageSrc,
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

  initializeFormGroupTechnology() {
    this.technologyForm.setValue({
      $key: null,
      title: '',
      imageSrc: '',
      details: '',
      isView: false
    });
  }

  getTechnology() {
    this.technologyList = this.firebase.list('technologyNews');
    return this.technologyList.snapshotChanges();
  }

  insertTechnology(news) {
    this.technologyList.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  setTechnology(news) {
    this.technology.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  updateTechnology(news) {
    this.technologyList.update(news.$key, {
      title: news.title,
      imageSrc: news.imageSrc,
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

  initializeFormGroupTopStories() {
    this.topStoriesForm.setValue({
      $key: null,
      title: '',
      imageSrc: '',
      details: '',
      isView: false
    });
  }

  getTopStories() {
    this.topStoriesList = this.firebase.list('topStoriesNews');
    return this.topStoriesList.snapshotChanges();
  }

  insertTopStories(news) {
    this.topStoriesList.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  setTopStories(news) {
    this.topStories.push({
      title: news.title,
      imageSrc: news.imageSrc,
      details: news.details,
      isView: false
    });
  }

  updateTopStories(news) {
    this.topStoriesList.update(news.$key, {
      title: news.title,
      imageSrc: news.imageSrc,
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
