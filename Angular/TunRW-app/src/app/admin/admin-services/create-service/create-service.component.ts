import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Service } from '../services.modal';
import { AdminService } from '../adminService.service';
@Component ({
  selector : 'app-create-service',
  templateUrl : './create-service.component.html',
  styleUrls : ['./create-service.component.css']
})

export class CreateServiceComponent implements OnInit {
  title = '';
  description = '';
  mode = 'create';
  private serviceId: string;
  errorFlag = false;
  service: Service;
  isLoading = false;
  form: FormGroup;

  constructor(public adminService: AdminService,
              public route: ActivatedRoute) {}

  ngOnInit(): void {
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
