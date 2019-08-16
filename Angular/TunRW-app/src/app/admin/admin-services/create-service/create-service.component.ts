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

export class CreateServiceComponent implements OnInit, AfterViewInit {

  firstIcon: string;
  scdIcon: string;
  thirdIcon: string;
  fourthIcon: string;
  fifthIcon: string;

  title = '';
  description = '';
  icon = '';
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
  defaultIconClass :string;

  constructor(public adminService: AdminService,
              private ngZone: NgZone,
              public route: ActivatedRoute) {
                this.defaultIconClass = this.fontAwesomeList[this.activeSliderCounter];

              }

  ngOnInit(): void {
    this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart, this.activeCounterStart + 5);
    console.log("list", this.activeIconList);
    this.form = new FormGroup({
      title : new FormControl(null, {validators: [Validators.required , Validators.minLength(0)]}),
      description: new FormControl(null, {validators: [Validators.required ]}),
      icon: new FormControl(null, {validators: [Validators.required ]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('serviceId')) {
        this.mode = 'edit';
        this.serviceId = paramMap.get('serviceId');
        this.isLoading = true;
        this.adminService.getSingleService(this.serviceId).subscribe(postData => {
          this.isLoading = false;
          this.service = {id: postData._id, description: postData.description,icon: postData.icon,
                        title: postData.title,  creator:postData.creator};
          this.form.setValue({title: this.service.title ,  description: this.service.description , icon: this.service.icon});
          const iconIndex =this.fontAwesomeList.indexOf(this.service.icon);
          this.onChangeSlider(iconIndex);
          this.defaultIconClass = this.fontAwesomeList[iconIndex];
        });
       

      } else {
        this.mode = 'create';
        this.serviceId = null;
      }
   
    });

  }
  onChangeSlider(value){
    this.activeCounterStart = value -2;
    this.activeSliderCounter = value;
    if(this.activeCounterStart >= 0) {
      this.activeIconList = this.fontAwesomeList.slice(this.activeCounterStart,this.activeCounterStart+ 5);
    }else if(this.activeCounterStart < 0 ){
      this.activeIconList = this.fontAwesomeList.slice(0,4);
      this.activeIconList.unshift("noClass");

      if(this.activeCounterStart == -2)
        this.activeIconList.unshift("noClass");

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

    this.setServicesIcons();

  }
  onClickFirst(){
    if(this.activeSliderCounter > 0){
      this.onChangeSlider(this.activeSliderCounter - 2);
    }
  }
  onClickSecond(){
    if(this.activeSliderCounter > 0){
      this.onChangeSlider(this.activeSliderCounter - 1);
    }
  }
  onClickFourth(){
    if(this.activeSliderCounter < this.fontAwesomeList.length - 1){
      this.onChangeSlider(this.activeSliderCounter +1);
    }
  }
  onClickFifth(){
    if(this.activeSliderCounter < this.fontAwesomeList.length - 1){
      this.onChangeSlider(this.activeSliderCounter +2);
    }
  }
  ngAfterViewInit(){
      this.setServicesIcons();
  }
  onNextClick(){
    if(this.activeSliderCounter < this.fontAwesomeList.length -1) {
      this.activeCounterStart ++;
      this.activeSliderCounter++;
      if(this.activeSliderCounter == 1){
        this.activeIconList = this.fontAwesomeList.slice(0,4);
        this.activeIconList.unshift("noClass");
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
        this.activeIconList.unshift("noClass");
      }else if(this.activeSliderCounter == 0){
        this.activeIconList = this.fontAwesomeList.slice(0,3);
        this.activeIconList.unshift("noClass");
        this.activeIconList.unshift("noClass");
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
    
      }
      this.setServicesIcons();
     
    }


  }
  initializeIcons(){
    this.firstIcon = "";
    this.scdIcon = "";
    this.thirdIcon = "";
    this.fourthIcon = "";
    this.fifthIcon = "";

    this.firstIcon = "serviceIcon";
    this.scdIcon = "fa-2x serviceIcon ";
    this.thirdIcon = "fa-3x serviceIcon ";
    this.fourthIcon = "fa-2x serviceIcon ";
    this.fifthIcon = "serviceIcon";


  }
  setServicesIcons(){
    console.log("setting up" ,this.activeIconList, this.activeSliderCounter) ;
    this.initializeIcons();

  
    this.defaultIconClass = this.fontAwesomeList[this.activeSliderCounter];
    // this.activeIcon.nativeElement.firstChild.className = "fa-4x mb-4 ";
    // this.activeIcon.nativeElement.firstChild.style.color = "#e71425";
    // first Icon
    this.firstIcon = this.activeIconList[0];

    //scd Icon
    this.scdIcon = this.activeIconList[1];



    //Third Icon
    this.thirdIcon = this.activeIconList[2];


    //Fourth Icon
    this.fourthIcon  = this.activeIconList[3];

 
    //Fifth Icon
    this.fifthIcon  = this.activeIconList[4];
    
  }
  onSaveService() {
    this.form.controls.icon.setValue(this.activeIconList[2]);
    if (this.form.invalid) {
      this.errorFlag = true;
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.adminService.addService( this.form.value.title,
        this.form.value.description, this.form.value.icon
        );


    } else {
      this.adminService.updateService(this.serviceId, this.form.value.title,
        this.form.value.description, this.form.value.icon
        );
    }
    this.errorFlag = false;
    this.form.reset();
  }
}
