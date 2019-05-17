import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Token } from '@angular/compiler';
import { tryParse } from 'selenium-webdriver/http';

@Injectable({providedIn: "root"})
export class AuthService {
  constructor(private http: HttpClient) {}

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser){
      return;
    }
    const token = currentUser.token;
    return token;

  }
  getAuthStatus(){
    const tmp = JSON.parse(localStorage.getItem('isLogged'));
    if ( tmp ) {
      return true;
    } else {
      return false;
    }
  }

  createUser(username: string, password: string) {
    const authData: AuthData = {username: username, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response =>{
          console.log(response);
      });
  }
  loginUser(username: string, password: string ) {
    const authData: AuthData = {username: username, password: password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response =>{
        localStorage.setItem('currentUser', JSON.stringify({ token: response.token }));
        localStorage.setItem('isLogged', 'true');

      });

  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLogged');
  }
}
