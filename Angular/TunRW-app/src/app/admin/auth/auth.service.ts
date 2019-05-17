import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';

@Injectable({providedIn: "root"})
export class AuthService {
  private tokenTimer;
  constructor(private http: HttpClient,
              private router:Router ) {}

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
  getAuthStatus(){
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
    if (!currentUser || !expirationDate || !isLogged ) {
      return;
    }
    return {
      token: currentUser.token,
      expirationDate : new Date(expirationDate.value),
      isLogged : isLogged
    }
  }
  autoAuthUser() {
    if (this.getAuthStatus()) {
      const authInformation = this.getAuthData();
      console.log('Auth Data ', authInformation);
      const now = new Date();
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      console.log('Auth Ends in ', expiresIn);
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
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
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
    localStorage.setItem('isLogged', 'true');
  }
  private clearAuthData() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('expiration');
    localStorage.removeItem('isLogged');
  }

  logout() {
    this.clearAuthData();
    this.router.navigate(['/login']);
    clearTimeout(this.tokenTimer);

  }
}
