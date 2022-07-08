import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/models/user/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  private userSubject = new BehaviorSubject<User | null>(null);
  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);
  private cookie = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private cookieservice: CookieService) { }

  get user() {
    return this.userSubject.value;
  }

  get isLoggedIn() {
    if (this.cookieservice.get('userID') != '') {
      this.loggedIn.next(true);
    }
    return this.loggedIn.asObservable();
  }

  get isAdmin() {
    if (this.cookieservice.get('userType') != '') {
      let userType = this.cookieservice.get('userType');
      if (userType == "admin") {
        this.admin.next(true);
      }
      if (userType == 'member') {
        this.admin.next(false);
      }
    }
    if(this.cookieservice.get('userID') == ''){
      this.admin.next(false);
    }
    return this.admin.asObservable();
  }

  get isCookie() {
    if (this.cookieservice.get('userID'))
      this.cookie.next(true);
    return this.cookie.asObservable();
  }

  removeUser() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  async register(fullname: string, login: string, password: string) {
    let newuser: any = await this.http.post(`${environment.apiUrl}/user/register`, { fullname, login, password }).toPromise();
    return newuser;
  }

  async login(login: string, password: string) {
    let user = (await this.http.post(`${environment.apiUrl}/user/login`, { login, password }).toPromise()) as any;
    if (user) {
      const dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 1);
      this.cookieservice.set('userID', user.userID, dateNow);
      this.cookieservice.set('userType', user.usertype, dateNow);
      this.userSubject.next(user);
      this.loggedIn.next(true);
      if (user.usertype == 'admin') {
        this.admin.next(true);
      }else{
        this.admin.next(false);
      }
      localStorage.setItem('user', user);
    }
    //console.log(user);
    return user;
  }

  logout() {
    this.cookie.next(false);
    this.loggedIn.next(false);
    this.cookieservice.delete('userID');
    this.cookieservice.delete('userType');
    this.cookieservice.deleteAll();
    this.removeUser();
  }

}