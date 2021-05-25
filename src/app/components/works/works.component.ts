import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  worksImages = [];

  images = [
    {
      caption: 'Benion Animated Counter',
      image: '../../../assets/images/benion-animated-counter.jpg',
      link: 'https://benion28.github.io/benion-animated-counter/'
    },
    {
      caption: 'Benion Animated Moving Car',
      image: '../../../assets/images/benion-animated-moving-car.jpg',
      link: 'https://benion28.github.io/benion-animated-moving-car/'
    },
    {
      caption: 'Benion Expense Tracker MERN',
      image: '../../../assets/images/benion-expense-tracker-mern.jpg',
      link: 'https://benion-expense-tracker.herokuapp.com/'
    },
    {
      caption: 'Benion Chat Room',
      image: '../../../assets/images/benion-chat-room.jpg',
      link: 'https://benion-chat-room.herokuapp.com/'
    },
    {
      caption: 'Benion Admin Dashboard',
      image: '../../../assets/images/benion-dashboard.jpg',
      link: 'https://benion-dashboard.firebaseapp.com/'
    },
    {
      caption: 'Benion Expense Tracker REACT',
      image: '../../../assets/images/benion-expense-tracker-react.jpg',
      link: 'https://benion28.github.io/benion-expense-tracker-react/'
    },
    {
      caption: 'Benion Project',
      image: '../../../assets/images/benion-project.jpg',
      link: 'https://beniontech.firebaseapp.com/'
    },
    {
      caption: 'Benion Express',
      image: '../../../assets/images/benion-express.jpg',
      link: 'https://benion-express.herokuapp.com/'
    },
    {
      caption: 'Benion Portfolio',
      image: '../../../assets/images/benion-portfolio.jpg',
      link: 'https://github.com/benion28/benion-portfolio/'
    },
    {
      caption: 'Benion Passport Login',
      image: '../../../assets/images/benion-passport-login.jpg',
      link: 'https://benion-passport-login.herokuapp.com/'
    },
    {
      caption: 'Benion Tailwindcss Image Gallery',
      image: '../../../assets/images/benion-tailwind.jpg',
      link: 'https://benion28.github.io/benion-tailwind/'
    },
    {
      caption: 'Benion Parcel Boilerplate',
      image: '../../../assets/images/benion-parcel.jpg',
      link: 'https://benion28.github.io/benion-parcel/'
    },
    {
      caption: 'Benion Health Panel With CSS Grid And Image Span',
      image: '../../../assets/images/benion-health-panel.jpg',
      link: 'https://benion28.github.io/benion-health-panel/'
    },
    {
      caption: 'Benion React Hooks With Firebase CRUD',
      image: '../../../assets/images/benion-firebase-crud.jpg',
      link: 'https://benion28.github.io/benion-firebase-crud/'
    },
    {
      caption: 'A Product Card With CSS Designs',
      image: '../../../assets/images/product-card.jpg',
      link: 'https://benion28.github.io/product-card/'
    },
    {
      caption: 'An Animated Profile Card',
      image: '../../../assets/images/animated-profile-card.jpg',
      link: 'https://benion28.github.io/animated-profile-card/'
    },
    {
      caption: 'A Responsive Login Form',
      image: '../../../assets/images/responsive-login-form.jpg',
      link: 'https://benion28.github.io/responsive-login-form/'
    },
    {
      caption: 'An Analog Clock',
      image: '../../../assets/images/analog-clock.jpg',
      link: 'https://benion28.github.io/analog-clock/'
    }
  ];

  constructor(public imagesService: ImagesService) { }

  ngOnInit(): void {
    let images = [];
    this.imagesService.getImages().subscribe(list => {
      images = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
      this.worksImages = images.filter(image => image.category === 'Works');
    });
  }

}
