import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './home-images.component.html',
  styleUrls: ['./home-images.component.css']
})
export class HomeImagesComponent implements OnInit {

  displayedImage = {
    imgTitle: 'Benion-Tech Banner',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/benion-database.appspot.com/o/Others%2Fbenion-tech-fb-banner_1594856905421?alt=media&token=8c7f4f18-6e47-4a98-a021-018ae1394a3b'
  };

  images = [
    {
      imgId: 1,
      imgTitle: 'Benion-Tech Banner',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/benion-database.appspot.com/o/Others%2Fbenion-tech-fb-banner_1594856905421?alt=media&token=8c7f4f18-6e47-4a98-a021-018ae1394a3b'
    },
    {
      imgId: 2,
      imgTitle: 'Smart City',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/benion-database.appspot.com/o/Others%2Fsmart-city_1594857512741?alt=media&token=c6b04999-5005-4132-a545-51cb65de772c'
    },
    {
      imgId: 3,
      imgTitle: 'Laptop',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/benion-database.appspot.com/o/Others%2Flaptop_1594857081473?alt=media&token=9aafd07a-76ce-497b-95b9-fa506cb1f82c'
    },
    {
      imgId: 4,
      imgTitle: 'Technology',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/benion-database.appspot.com/o/Others%2Ftechnology_1594857543151?alt=media&token=8f4d8fef-71c3-4751-b494-b15de13896af'
    },
    {
      imgId: 5,
      imgTitle: 'ICT',
      imgSrc: 'https://firebasestorage.googleapis.com/v0/b/benion-database.appspot.com/o/Others%2Fict_1594857042147?alt=media&token=0b29bd91-d8f7-4e8c-bb8b-650a3fed8431'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.getRandomValue();
    }, 10000);
  }

  getRandomValue() {
    const randomValue = Math.floor(Math.random() * 10);
    this.validateNumber(randomValue);
  }

  validateNumber(randomNumber) {
    if (randomNumber > 0 && randomNumber <= this.images.length) {
      this.getImage(randomNumber);
    } else {
      this.getRandomValue();
    }
  }

  getImage(randomId) {
    const selectedImage = this.images.filter(image => randomId === image.imgId)[0];
    this.displayedImage = {
      imgTitle: selectedImage.imgTitle,
      imgSrc: selectedImage.imgSrc
    };
  }

}
