import { Component } from "@angular/core";
import { NgForm} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
   isLoading = false;
   invalidFlag = false;
   constructor(public authService: AuthService,
               private router: Router) {

    console.log('user status', this.authService.getAuthStatus());
               }

   onLogin(form: NgForm){
    this.invalidFlag = true;
    if (form.invalid) {
      return;
    }
    this.authService.loginUser(form.value.username, form.value.password);
    this.router.navigate(['/admin/Events']);
   }
}
