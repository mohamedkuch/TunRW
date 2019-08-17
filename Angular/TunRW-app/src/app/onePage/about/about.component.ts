import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector : 'app-about',
  templateUrl : './about.component.html',
  styleUrls : ['./about.component.scss']
})

export class AboutComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    this.slickModal.slickGoTo(3);
  }
  @ViewChild('slickModal', {static: false}) slickModal: SlickCarouselComponent;
  title = 'ngSlick';
  
 
  slides = [
    {img: "http://placehold.it/350x350/777777"},
    {img: "http://placehold.it/350x350/777777"},
    {img: "http://placehold.it/350x350/777777"},
    {img: "http://placehold.it/350x350/777777"},
    {img: "http://placehold.it/350x350/777777"},
    {img: "http://placehold.it/350x350/777777"},

  ];
 
  slideConfig = {
    "slidesToShow": 3, 
    "slidesToScroll": 1,
    "dots":true,
    "autoplay":true, "autoplaySpeed": 1500,
    "infinite": true,
    "responsive": [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  constructor(){
   
  }
  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
 
}

