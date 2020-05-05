import { NewsService } from './../../services/news.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SportsService } from './../../services/sports.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { TechnologyService } from './../../services/technology.service';
import { EntertainmentService } from './../../services/entertainment.service';
import { TopStoriesService } from './../../services/top-stories.service';
import { fadeAnimation } from './../../fade-animations';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class AdminNewsComponent implements OnInit {

  constructor(
    public topStoriesNews: TopStoriesService,
    public entertainmentNews: EntertainmentService,
    public sportsNews: SportsService,
    public technologyNews: TechnologyService,
    public notificationsService: NotificationsService,
    public dialogService: DialogService,
    public newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.topStoriesNews.getTopStories();
    this.entertainmentNews.getEntertainment();
    this.sportsNews.getSports();
    this.technologyNews.getTechnology();
  }
  onSubmitTopStories() {
    if (this.topStoriesNews.topStoriesForm.valid) {
        if (!this.topStoriesNews.topStoriesForm.get('$key').value) {
          this.topStoriesNews.insertTopStories(this.topStoriesNews.topStoriesForm.value);
          this.topStoriesNews.topStoriesForm.reset();
          this.topStoriesNews.initializeFormGroupTopStories();
          this.notificationsService.success(':: Has Been Submitted Successfully ::');
        } else {
          this.topStoriesNews.updateTopStories(this.topStoriesNews.topStoriesForm.value);
          this.topStoriesNews.topStoriesForm.reset();
          this.topStoriesNews.initializeFormGroupTopStories();
          this.notificationsService.success(':: Has Been Updated Successfully ::');
        }
      }
    }

  onEditTopStories(news) {
    this.topStoriesNews.populateTopStoriesForm(news);
  }

  onDeleteTopStories($key) {
    this.dialogService.openConfirmDialog('Are You Sure You Want To Delete This Record ?').afterClosed().subscribe(response => {
      if (response) {
        this.topStoriesNews.deleteTopStories($key);
        this.notificationsService.warn(' !! It Has Been Deleted Successfully !!! ');
      }
    });
  }


  onSubmitSports() {
    if (this.sportsNews.sportsForm.valid) {
        if (!this.sportsNews.sportsForm.get('$key').value) {
          this.sportsNews.insertSports(this.sportsNews.sportsForm.value);
          this.sportsNews.sportsForm.reset();
          this.sportsNews.initializeFormGroupSports();
          this.notificationsService.success(':: Has Been Submitted Successfully ::');
        } else {
          this.sportsNews.updateSports(this.sportsNews.sportsForm.value);
          this.sportsNews.sportsForm.reset();
          this.sportsNews.initializeFormGroupSports();
          this.notificationsService.success(':: Has Been Updated Successfully ::');
        }
      }
    }

  onEditSports(news) {
    this.sportsNews.populateSportsForm(news);
  }

  onDeleteSports($key) {
    this.dialogService.openConfirmDialog('Are You Sure You Want To Delete This Record ?').afterClosed().subscribe(response => {
      if (response) {
        this.sportsNews.deleteSports($key);
        this.notificationsService.warn(' !! It Has Been Deleted Successfully !!! ');
      }
    });
  }


  onSubmitEntertainment() {
    if (this.entertainmentNews.entertainmentForm.valid) {
        if (!this.entertainmentNews.entertainmentForm.get('$key').value) {
          this.entertainmentNews.insertEntertainment(this.entertainmentNews.entertainmentForm.value);
          this.entertainmentNews.entertainmentForm.reset();
          this.entertainmentNews.initializeFormGroupEntertainment();
          this.notificationsService.success(':: Has Been Submitted Successfully ::');
        } else {
          this.entertainmentNews.updateEntertainment(this.entertainmentNews.entertainmentForm.value);
          this.entertainmentNews.entertainmentForm.reset();
          this.entertainmentNews.initializeFormGroupEntertainment();
          this.notificationsService.success(':: Has Been Updated Successfully ::');
        }
      }
    }

  onEditEntertainment(news) {
    this.entertainmentNews.populateEntertainmentForm(news);
  }

  onDeleteEntertainment($key) {
    this.dialogService.openConfirmDialog('Are You Sure You Want To Delete This Record ?').afterClosed().subscribe(response => {
      if (response) {
        this.entertainmentNews.deleteEntertainment($key);
        this.notificationsService.warn(' !! It Has Been Deleted Successfully !!! ');
      }
    });
  }


  onSubmitTechnology() {
    if (this.technologyNews.technologyForm.valid) {
        if (!this.technologyNews.technologyForm.get('$key').value) {
          this.technologyNews.insertTechnology(this.technologyNews.technologyForm.value);
          this.technologyNews.technologyForm.reset();
          this.technologyNews.initializeFormGroupTechnology();
          this.notificationsService.success(':: Has Been Submitted Successfully ::');
        } else {
          this.technologyNews.updateTechnology(this.technologyNews.technologyForm.value);
          this.technologyNews.technologyForm.reset();
          this.technologyNews.initializeFormGroupTechnology();
          this.notificationsService.success(':: Has Been Updated Successfully ::');
        }
      }
    }

  onEditTechnology(news) {
    this.technologyNews.populateTechnologyForm(news);
  }

  onDeleteTechnology($key) {
    this.dialogService.openConfirmDialog('Are You Sure You Want To Delete This Record ?').afterClosed().subscribe(response => {
      if (response) {
        this.technologyNews.deleteTechnology($key);
        this.notificationsService.warn(' !! It Has Been Deleted Successfully !!! ');
      }
    });
  }

  onSortTopStoriesNews() {
    this.topStoriesNews.topStories = this.topStoriesNews.topStories.sort();
  }

  onSortSportsNews() {
    this.sportsNews.sports = this.sportsNews.sports.sort();
  }

  onSortEntertainmentNews() {
    this.entertainmentNews.entertainment = this.entertainmentNews.entertainment.sort();
  }

  onSortTechnologyNews() {
    this.technologyNews.technology = this.technologyNews.technology.sort();
  }
}
