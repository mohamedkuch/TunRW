import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: "root"})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token;
    console.log(token);
    return token;
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
        console.log("zezeze" , response);
        localStorage.setItem('currentUser', JSON.stringify({ token: response.token }));

      });

  }
}
