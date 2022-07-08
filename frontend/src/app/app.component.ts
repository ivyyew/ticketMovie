import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ticketMovie';
  userType$!:  Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;

  constructor(
    public authservice: AuthService,
    public router: Router,
  ){}

  ngOnInit(){
    this.isLoggedIn$ = this.authservice.isLoggedIn;
    this.userType$ = this.authservice.isAdmin;
  }

  onLogout(){
    this.authservice.logout();
    this.router.navigate(['login']);
  }
}
