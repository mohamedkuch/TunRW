import { Component } from "@angular/core";
import { NgForm} from "@angular/forms";
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   isLoading = false;
   invalidFlag = false;
   constructor() { }

   onLogin(form: NgForm){
    this.invalidFlag = true;
   }
}
