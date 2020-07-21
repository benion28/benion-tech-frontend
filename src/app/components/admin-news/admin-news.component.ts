import { NewsService } from './../../services/news.service';
import { DialogService } from 'src/app/services/dialog.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { fadeAnimation } from './../../fade-animations';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css'],
  animations: [fadeAnimation]
})
export class AdminNewsComponent implements OnInit {
  constructor(
    public usersService: UsersService,
    public notificationsService: NotificationsService,
    public dialogService: DialogService,
    public newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.newsService.getTopStories();
    this.newsService.getEntertainment();
    this.newsService.getSports();
    this.newsService.getTechnology();

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

  onSubmitTopStories() {
    if (this.newsService.topStoriesForm.valid) {
      if (!this.newsService.topStoriesForm.get('$key').value) {
        this.newsService.insertTopStories(
          this.newsService.topStoriesForm.value
        );
        this.newsService.topStoriesForm.reset();
        this.newsService.initializeFormGroupTopStories();
        this.newsService.setTopStories(
          this.newsService.topStoriesForm.value
        );
        this.notificationsService.success(
          ':: Has Been Submitted Successfully ::'
        );
      } else {
        this.newsService.updateTopStories(
          this.newsService.topStoriesForm.value
        );
        this.newsService.topStoriesForm.reset();
        this.newsService.initializeFormGroupTopStories();
        this.notificationsService.success(
          ':: Has Been Updated Successfully ::'
        );
      }
    }
  }

  onEditTopStories(news) {
    this.newsService.populateTopStoriesForm(news);
  }

  onDeleteTopStories($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.newsService.deleteTopStories($key);
          this.notificationsService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  onSubmitSports() {
    if (this.newsService.sportsForm.valid) {
      if (!this.newsService.sportsForm.get('$key').value) {
        this.newsService.insertSports(this.newsService.sportsForm.value);
        this.newsService.sportsForm.reset();
        this.newsService.initializeFormGroupSports();
        this.newsService.setSports(this.newsService.sportsForm.value);
        this.notificationsService.success(
          ':: Has Been Submitted Successfully ::'
        );
      } else {
        this.newsService.updateSports(this.newsService.sportsForm.value);
        this.newsService.sportsForm.reset();
        this.newsService.initializeFormGroupSports();
        this.notificationsService.success(
          ':: Has Been Updated Successfully ::'
        );
      }
    }
  }

  onEditSports(news) {
    this.newsService.populateSportsForm(news);
  }

  onDeleteSports($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.newsService.deleteSports($key);
          this.notificationsService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  onSubmitEntertainment() {
    if (this.newsService.entertainmentForm.valid) {
      if (!this.newsService.entertainmentForm.get('$key').value) {
        this.newsService.insertEntertainment(
          this.newsService.entertainmentForm.value
        );
        this.newsService.entertainmentForm.reset();
        this.newsService.initializeFormGroupEntertainment();
        this.newsService.setEntertainment(
          this.newsService.entertainmentForm.value
        );
        this.notificationsService.success(
          ':: Has Been Submitted Successfully ::'
        );
      } else {
        this.newsService.updateEntertainment(
          this.newsService.entertainmentForm.value
        );
        this.newsService.entertainmentForm.reset();
        this.newsService.initializeFormGroupEntertainment();
        this.notificationsService.success(
          ':: Has Been Updated Successfully ::'
        );
      }
    }
  }

  onEditEntertainment(news) {
    this.newsService.populateEntertainmentForm(news);
  }

  onDeleteEntertainment($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.newsService.deleteEntertainment($key);
          this.notificationsService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  onSubmitTechnology() {
    if (this.newsService.technologyForm.valid) {
      if (!this.newsService.technologyForm.get('$key').value) {
        this.newsService.insertTechnology(
          this.newsService.technologyForm.value
        );
        this.newsService.technologyForm.reset();
        this.newsService.initializeFormGroupTechnology();
        this.newsService.setTechnology(
          this.newsService.technologyForm.value
        );
        this.notificationsService.success(
          ':: Has Been Submitted Successfully ::'
        );
      } else {
        this.newsService.updateTechnology(
          this.newsService.technologyForm.value
        );
        this.newsService.technologyForm.reset();
        this.newsService.initializeFormGroupTechnology();
        this.notificationsService.success(
          ':: Has Been Updated Successfully ::'
        );
      }
    }
  }

  onEditTechnology(news) {
    this.newsService.populateTechnologyForm(news);
  }

  onDeleteTechnology($key) {
    this.dialogService
      .openConfirmDialog('Are You Sure You Want To Delete This Record ?')
      .afterClosed()
      .subscribe(response => {
        if (response) {
          this.newsService.deleteTechnology($key);
          this.notificationsService.warn(
            ' !! It Has Been Deleted Successfully !!! '
          );
        }
      });
  }

  onSortTopStories() {
    this.newsService.topStories = this.newsService.topStories.sort();
  }

  onSortSports() {
    this.newsService.sports = this.newsService.sports.sort();
  }

  onSortEntertainments() {
    this.newsService.entertainment = this.newsService.entertainment.sort();
  }

  onSortTechnologies() {
    this.newsService.technology = this.newsService.technology.sort();
  }
}
