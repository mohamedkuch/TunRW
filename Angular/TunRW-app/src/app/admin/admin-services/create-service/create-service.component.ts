import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, NgZone, AfterViewChecked } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Service } from '../services.modal';
import { AdminService } from '../adminService.service';
@Component ({
  selector : 'app-create-service',
  templateUrl : './create-service.component.html',
  styleUrls : ['./create-service.component.scss']
})

export class CreateServiceComponent implements OnInit, AfterViewChecked {
  @ViewChild('firstIcon', {static: false}) private firstIcon: any;;
  @ViewChild('scdIcon', {static: false}) scdIcon: ElementRef;
  @ViewChild('thirdIcon', {static: false}) thirdIcon: ElementRef;
  @ViewChild('fourthIcon', {static: false}) fourthIcon: ElementRef;
  @ViewChild('fifthIcon', {static: false}) fifthIcon: ElementRef;

  title = '';
  description = '';
  mode = 'create';
  private serviceId: string;
  errorFlag = false;
  service: Service;
  isLoading = false;
  form: FormGroup;
  fontAwesomeList = ["fas fa-address-book","fas fa-address-card","fas fa-adjust","fas fa-align-center","fas fa-align-justify","fas fa-align-left","fas fa-align-right","fas fa-allergies","fas fa-ambulance","fas fa-american-sign-language-interpreting","fas fa-anchor","fas fa-angle-double-down","fas fa-angle-double-left","fas fa-angle-double-right","fas fa-angle-double-up","fas fa-angle-down","fas fa-angle-left","fas fa-angle-right","fas fa-angle-up","fas fa-archive","fas fa-arrow-alt-circle-down","fas fa-arrow-alt-circle-left","fas fa-arrow-alt-circle-right","fas fa-arrow-alt-circle-up","fas fa-arrow-circle-down","fas fa-arrow-circle-left","fas fa-arrow-circle-right","fas fa-arrow-circle-up","fas fa-arrow-down","fas fa-arrow-left","fas fa-arrow-right","fas fa-arrow-up","fas fa-arrows-alt","fas fa-arrows-alt-h","fas fa-arrows-alt-v","fas fa-assistive-listening-systems","fas fa-asterisk","fas fa-at","fas fa-audio-description","fas fa-backward","fas fa-balance-scale","fas fa-ban","fas fa-band-aid","fas fa-barcode","fas fa-bars","fas fa-baseball-ball","fas fa-basketball-ball","fas fa-bath","fas fa-battery-empty","fas fa-battery-full","fas fa-battery-half","fas fa-battery-quarter","fas fa-battery-three-quarters","fas fa-bed","fas fa-beer","fas fa-bell","fas fa-bell-slash","fas fa-bicycle","fas fa-binoculars","fas fa-birthday-cake","fas fa-blind","fas fa-bold","fas fa-bolt","fas fa-bomb","fas fa-book","fas fa-bookmark","fas fa-bowling-ball","fas fa-box","fas fa-box-open","fas fa-boxes","fas fa-braille","fas fa-briefcase","fas fa-briefcase-medical","fas fa-bug","fas fa-building","fas fa-bullhorn","fas fa-bullseye","fas fa-burn","fas fa-bus","fas fa-calculator","fas fa-calendar","fas fa-calendar-alt","fas fa-calendar-check","fas fa-calendar-minus","fas fa-calendar-plus"
];
  activeIconList : any;
  activeCounterStart = 0;
  activeSliderCounter = 2;

  constructor(public adminService: AdminService,
              public route: ActivatedRoute) {

              }

  ngOnInit(): void {
    this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart, this.activeCounterStart + 5);
    console.log("list", this.activeIconList);
    this.form = new FormGroup({
      title : new FormControl(null, {validators: [Validators.required , Validators.minLength(0)]}),
      description: new FormControl(null, {validators: [Validators.required ]}),
      
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('serviceId')) {
        this.mode = 'edit';
        this.serviceId = paramMap.get('serviceId');
        this.isLoading = true;
        this.adminService.getSingleService(this.serviceId).subscribe(postData => {
          this.isLoading = false;
          this.service = {id: postData._id, description: postData.description,
                        title: postData.title,  creator:postData.creator};
          this.form.setValue({title: this.service.title ,  description: this.service.description });
        });
  

      } else {
        this.mode = 'create';
        this.serviceId = null;
      }
 
   
    });

    if( this.mode == 'edit') {
      this.activeSliderCounter = 50;
      this.activeCounterStart = this.activeSliderCounter -2;
    }
  }
  onChangeSlider(event){
    this.activeCounterStart = event.value -2;
    this.activeSliderCounter = event.value;
    if(this.activeCounterStart >= 0) {
      this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart+ 5);
    }else if(this.activeCounterStart < 0 ){
      this.activeIconList = this.fontAwesomeList.slice(0,4);
      this.activeIconList.unshift("");

      if(this.activeCounterStart == -2)
        this.activeIconList.unshift("");

    }
    // previous Last Element
    if(this.activeSliderCounter == this.fontAwesomeList.length-2) {
      this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart + 4);
      this.activeIconList.push("noClass");
    }
    // Last Element
    if(this.activeSliderCounter == this.fontAwesomeList.length-1) {
      this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart + 3);
      this.activeIconList.push("noClass");
      this.activeIconList.push("noClass");
    }

    console.log("setting up", this.fontAwesomeList.length, this.activeSliderCounter);
    console.log("Array", this.activeIconList);
    this.setServicesIcons();

  }

  ngAfterViewChecked(){
    if(this.firstIcon){
      this.setServicesIcons();
    }
  }
  onNextClick(){
    if(this.activeSliderCounter < this.fontAwesomeList.length -1) {
      this.activeCounterStart ++;
      this.activeSliderCounter++;
      if(this.activeSliderCounter == 1){
        this.activeIconList = this.fontAwesomeList.slice(0,4);
        this.activeIconList.unshift("");
      }
      if(this.activeSliderCounter == this.fontAwesomeList.length-1){
        this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart + 3);
        this.activeIconList.push("noClass");
        this.activeIconList.push("noClass");
      }
      if(this.activeSliderCounter == this.fontAwesomeList.length - 2) {
        this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart + 4);
        this.activeIconList.push("noClass");
      }
      if(this.activeSliderCounter <= this.fontAwesomeList.length-3 && this.activeSliderCounter >= 2) {
        this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart+ 5);
      }
      this.setServicesIcons();
    }
  }
  onPrevClick(){
    if(this.activeSliderCounter > 0 ){
      this.activeCounterStart --;
      this.activeSliderCounter--;
      if(this.activeSliderCounter == 1){
        this.activeIconList = this.fontAwesomeList.slice(0,4);
        this.activeIconList.unshift("");
      }else if(this.activeSliderCounter == 0){
        this.activeIconList = this.fontAwesomeList.slice(0,3);
        this.activeIconList.unshift("");
        this.activeIconList.unshift("");
      }else if(this.activeSliderCounter == this.fontAwesomeList.length - 2) {
        this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart + 4);
        this.activeIconList.push("noClass");
      }else if(this.activeSliderCounter == this.fontAwesomeList.length - 1) {
        this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart + 4);
        this.activeIconList.push("noClass");
        this.activeIconList.push("noClass");
      }
      else {
        this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart+ 5);
        this.setServicesIcons();
      }
     
    }


  }
  setServicesIcons(){
    console.log("setting up" ,this.activeIconList);

    this.firstIcon.nativeElement.firstChild.className = "serviceIcon";
    this.scdIcon.nativeElement.firstChild.className = "fa-2x serviceIcon ";
    this.thirdIcon.nativeElement.firstChild.className = "fa-3x serviceIcon ";
    this.fourthIcon.nativeElement.firstChild.className = "fa-2x serviceIcon ";
    this.fifthIcon.nativeElement.firstChild.className = "serviceIcon";
  
    // first Icon
    if(this.activeCounterStart >= 0) {
      const spaceIndex = this.activeIconList[0].indexOf(' ');
      if( spaceIndex >= 0){
        var splitted = this.activeIconList[0].split(" ", 2); 
        this.firstIcon.nativeElement.firstChild.classList.add(splitted[0]);
        this.firstIcon.nativeElement.firstChild.classList.add(splitted[1]);
      }else {
        this.firstIcon.nativeElement.firstChild.classList.add(this.activeIconList[0]);
      }
    }

    //scd Icon
    if(this.activeCounterStart >= -1) {
      const spaceIndex2 = this.activeIconList[1].indexOf(' ');
      if( spaceIndex2 >= 0){
        var splitted = this.activeIconList[1].split(" ", 2); 
        this.scdIcon.nativeElement.firstChild.classList.add(splitted[0]);
        this.scdIcon.nativeElement.firstChild.classList.add(splitted[1]);
      }else {
        this.scdIcon.nativeElement.firstChild.classList.add(this.activeIconList[1]);
      }
    }

    //Third Icon
    const spaceIndex3 = this.activeIconList[2].indexOf(' ');
    if( spaceIndex3 >= 0){
      var splitted = this.activeIconList[2].split(" ", 2); 
      this.thirdIcon.nativeElement.firstChild.classList.add(splitted[0]);
      this.thirdIcon.nativeElement.firstChild.classList.add(splitted[1]);
    }else {
      this.thirdIcon.nativeElement.firstChild.classList.add(this.activeIconList[2]);
    }

    //Fourth Icon
    const spaceIndex4 = this.activeIconList[3].indexOf(' ');
    if( spaceIndex4 >= 0){
      var splitted = this.activeIconList[3].split(" ", 2); 
      this.fourthIcon.nativeElement.firstChild.classList.add(splitted[0]);
      this.fourthIcon.nativeElement.firstChild.classList.add(splitted[1]);
    }else {
      this.fourthIcon.nativeElement.firstChild.classList.add(this.activeIconList[3]);
    }

    //Fourth Icon
    const spaceIndex5 = this.activeIconList[4].indexOf(' ');
    if( spaceIndex5 >= 0){
      var splitted = this.activeIconList[4].split(" ", 2); 
      this.fifthIcon.nativeElement.firstChild.classList.add(splitted[0]);
      this.fifthIcon.nativeElement.firstChild.classList.add(splitted[1]);
    }else {
      this.fifthIcon.nativeElement.firstChild.classList.add(this.activeIconList[4]);
    }
    
  }
  onSaveService() {
    if (this.form.invalid) {
      this.errorFlag = true;
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.adminService.addService( this.form.value.title,
        this.form.value.description
        );


    } else {
      this.adminService.updateService(this.serviceId, this.form.value.title,
        this.form.value.description
        );
    }
    this.errorFlag = false;
    this.form.reset();
  }
}
