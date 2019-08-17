import { Component } from '@angular/core';

@Component({
  selector : 'app-about',
  templateUrl : './about.component.html',
  styleUrls : ['./about.component.scss']
})

export class AboutComponent{
  title = 'ngSlick';
 
 
  slides = [
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"},
    {img: "http://placehold.it/350x150/777777"}

  ];
 
  slideConfig = {
    "slidesToShow": 4, 
    "slidesToScroll": 1,
    "nextArrow":"<div class='nav-btn next-slide'></div>",
    "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots":true,
    "infinite": true
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

