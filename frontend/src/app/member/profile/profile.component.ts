import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = <User>{};
  login: string = '';
  fullname: string = '';

  constructor(
    private userservice: UserService,
    private router: Router,
    private cookieservice: CookieService
  ) { }

  async ngOnInit(){
    if(this.cookieservice.get('userID')!= ''){
      this.user = await this.userservice.currentUser();
      if(this.user){
        this.login = this.user.login;
        this.user.photo = '../../../assets/img/'+this.user.photo;
      }
    }else{
      this.router.navigate(['/home']);
    }
    
  }

  updateProfile(){
    this.router.navigate(['/member/profile/edit']);
  }

}
