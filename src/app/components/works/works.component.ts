import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  worksImages = [
    {
      title: 'Benion Animated Counter',
      imageSrc: '../../../assets/images/benion-animated-counter.jpg',
      href: 'https://benion28.github.io/benion-animated-counter/'
    },
    {
      title: 'Benion Animated Moving Car',
      imageSrc: '../../../assets/images/benion-animated-moving-car.jpg',
      href: 'https://benion28.github.io/benion-animated-moving-car/'
    },
    {
      title: 'Benion Expense Tracker MERN',
      imageSrc: '../../../assets/images/benion-expense-tracker-mern.jpg',
      href: 'https://benion-expense-tracker.herokuapp.com/'
    },
    {
      title: 'Benion Chat Room',
      imageSrc: '../../../assets/images/benion-chat-room.jpg',
      href: 'https://benion-chat-room.herokuapp.com/'
    },
    {
      title: 'Benion Admin Dashboard',
      imageSrc: '../../../assets/images/benion-dashboard.jpg',
      href: 'https://benion-dashboard.firebaseapp.com/'
    },
    {
      title: 'Benion Expense Tracker REACT',
      imageSrc: '../../../assets/images/benion-expense-tracker-react.jpg',
      href: 'https://benion28.github.io/benion-expense-tracker-react/'
    },
    {
      title: 'Benion Project',
      imageSrc: '../../../assets/images/benion-project.jpg',
      href: 'https://beniontech.firebaseapp.com/'
    },
    {
      title: 'Benion Express',
      imageSrc: '../../../assets/images/benion-express.jpg',
      href: 'https://benion-express.herokuapp.com/'
    },
    {
      title: 'Benion Portfolio',
      imageSrc: '../../../assets/images/benion-portfolio.jpg',
      href: 'https://github.com/benion28/benion-portfolio/'
    },
    {
      title: 'Benion Passport Login',
      imageSrc: '../../../assets/images/benion-passport-login.jpg',
      href: 'https://benion-passport-login.herokuapp.com/'
    },
    {
      title: 'Benion Tailwindcss Image Gallery',
      imageSrc: '../../../assets/images/benion-tailwind.jpg',
      href: 'https://benion28.github.io/benion-tailwind/'
    },
    {
      title: 'Benion Parcel Boilerplate',
      imageSrc: '../../../assets/images/benion-parcel.jpg',
      href: 'https://benion28.github.io/benion-parcel/'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
