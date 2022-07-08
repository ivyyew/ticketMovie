import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  userID?: number;
  fullname?: string;
  login?: string;
  item: any;

  constructor(private userservice: UserService, private cookieservice: CookieService, private router: Router) {
  }

  async ngOnInit() {
    if (!this.cookieservice.get('userID')) {
      this.cookieservice.deleteAll();
      this.router.navigate(['/home']);
    }

    this.item = await this.userservice.currentUser();
    this.userID = this.item.userID;
    this.fullname = this.item.fullname;
    this.login = this.item.login;
    console.log(this.userID);
  }

}