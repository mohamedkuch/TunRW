import { Component } from '@angular/core';

@Component({
  selector : 'app-about',
  templateUrl : './about.component.html',
  styleUrls : ['./about.component.css']
})

export class AboutComponent{
  slides = [
  {img: "http://placehold.it/370x370/666666"},
  {img: "http://placehold.it/370x370/666666"},
  {img: "http://placehold.it/370x370/666666"},
  {img: "http://placehold.it/370x370/666666"}
];
slideConfig = {"slidesToShow": 3, "slidesToScroll": 1,  "infinite": true};

constructor() {
}
addSlide() {
  this.slides.push({img: "http://placehold.it/350x150/777777"})
}

removeSlide() {
  this.slides.length = this.slides.length - 1;
}

afterChange(e) {
  console.log('afterChange');
}
}

