import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieservice: CookieService, private router: Router) { }

  ngOnInit() {
    if (this.cookieservice.get('userID') != '') {
      if (this.cookieservice.get('userType') == 'admin') {
        this.router.navigate(['/adminHome']);
      } else if (this.cookieservice.get('userType') == 'member') {
        this.router.navigate(['/memberHome']);
      }
    }
  }

}