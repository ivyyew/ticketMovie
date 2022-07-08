import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {
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