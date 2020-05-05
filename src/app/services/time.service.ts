import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  date = new Date();

  getWeek = this.date.getDay();

  weeks = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  day = this.date.getDate();

  week = this.weeks[this.getWeek];

  getMonth = this.date.getMonth();

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  month = this.months[this.getMonth];

  year = this.date.getFullYear();

  minute = this.date.getMinutes();

  hour = this.date.getHours();

  getDate = [
    {
      id: 1,
      day: this.day,
      week: this.week,
      month: this.month,
      year: this.year,
      minute: this.minute,
      hour: this.hour
    }
  ];

  constructor() { }

  reloadDateTime() {
    const updatedDate = new Date();
    this.getDate = [
      {
      id: 1,
      day: updatedDate.getDate(),
      week: this.weeks[updatedDate.getDay()],
      month: this.months[updatedDate.getMonth()],
      year: updatedDate.getFullYear(),
      minute: updatedDate.getMinutes(),
      hour: updatedDate.getHours()
      }
    ];
  }

}
