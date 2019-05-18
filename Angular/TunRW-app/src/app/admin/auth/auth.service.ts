import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Member } from '../admin-members/member.model';

@Injectable({providedIn: "root"})
export class AuthService {
  private tokenTimer;
  private currentuser: Member;
  constructor(private http: HttpClient,
              private router: Router ) {}

  getcurrentUser() {
    return this.currentuser;
  }
  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser){
      return;
    }
    const token = currentUser.token;
    return token;

  }
  getTokenExpirationDate() {
    const tmp = JSON.parse(localStorage.getItem('expiration'));
    if  (!tmp) {
      return;
    }
    const finalDate = new Date(tmp.value);
    return finalDate;
  }
  getAuthStatus() {
    const tmp = JSON.parse(localStorage.getItem('isLogged'));
    if ( tmp ) {
      return true;
    } else {
      return false;
    }
  }
  private getAuthData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLogged = localStorage.getItem('isLogged');
    const expirationDate = JSON.parse(localStorage.getItem('expiration'));
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const name = localStorage.getItem('name');
    if (!currentUser  ) {
      return;
    }
    return {
      token: currentUser.token,
      expirationDate : new Date(expirationDate.value),
      isLogged : isLogged,
      userId: userId,
      username: username,
      name: name
    }
  }
  autoAuthUser() {
    if (this.getAuthStatus()) {
      const authInformation = this.getAuthData();
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      this.currentuser = {username: authInformation.username,
        id: authInformation.userId, name: authInformation.name};
      if (expiresIn < 0){
        this.clearAuthData();
      }
    }


  }

  createUser(username: string, password: string) {
    const authData: AuthData = {username: username, password: password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
          console.log(response);
      });
  }
  loginUser(username: string, password: string ) {
    const authData: AuthData = {username: username, password: password};
    this.http
      .post<{token: string, expiresIn: number, username: string, id: string, name: string}>('http://localhost:3000/api/user/login',
       authData).subscribe(response => {
        this.saveAuthData(response);
        this.router.navigate(['/admin']);
      });

  }
  private setAuthTimer(duration: number) {
    console.log('Setting Timer : ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },  duration * 1000);
  }
  private saveAuthData(data){
    this.setAuthTimer(data.expiresIn);
    localStorage.setItem('currentUser', JSON.stringify({ token: data.token }));
    const now = new Date();
    const expirationDate = new Date( now.getTime() + data.expiresIn * 1000);
    localStorage.setItem('expiration', JSON.stringify({ value: expirationDate }));
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', data.username);
    localStorage.setItem('name', data.name);
    localStorage.setItem('isLogged', 'true');
    this.currentuser = {username: data.username, id: data.id, name:data.name};
    console.log('Logging with user ',  data);
  }
  private clearAuthData() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expiration');
    localStorage.removeItem('isLogged');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
  }

  logout() {
    this.clearAuthData();
    this.router.navigate(['/login']);
    clearTimeout(this.tokenTimer);
    this.createUser = null;
  }
}
