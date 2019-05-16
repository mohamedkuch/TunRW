import { Component } from "@angular/core";
import { NgForm} from "@angular/forms";
import { AuthService } from "../auth.service";
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   isLoading = false;
   invalidFlag = false;
   constructor(public authService: AuthService) { }

   onLogin(form: NgForm){
    this.invalidFlag = true;
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.username, form.value.password);
   }
}