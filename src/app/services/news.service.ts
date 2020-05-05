import { TopStoriesService } from './top-stories.service';
import { Injectable } from '@angular/core';
import { EntertainmentService } from './entertainment.service';
import { SportsService } from './sports.service';
import { TechnologyService } from './technology.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  topStories = [];
  sports = [];
  entertainment = [];
  education = [];
  technology = [];

  constructor(
    private topStoriesNews: TopStoriesService,
    private entertainmentNews: EntertainmentService,
    private sportsNews: SportsService,
    private technologyNews: TechnologyService
  ) {
    this.topStories = this.topStoriesNews.topStories.reverse();
    this.sports = this.sportsNews.sports.reverse();
    this.entertainment = this.entertainmentNews.entertainment.reverse();
    this.technology = this.technologyNews.technology.reverse();
  }
}
