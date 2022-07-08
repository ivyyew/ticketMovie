import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-booking-status',
  templateUrl: './booking-status.component.html',
  styleUrls: ['./booking-status.component.css']
})
export class BookingStatusComponent implements OnInit {
  movieName: string = '';
  bookingDate: Date = new Date();
  bookingTime: string = '';
  ticketPrice: number = 0;
  quantity: number = 0;
  total: number = 0;
  status: string = '';
  movieID: string = '';

  constructor(private router: Router,
    private route: ActivatedRoute, private cookieservice: CookieService) { }

  ngOnInit(): void {
    if(this.cookieservice.get('userID')!=''){
      if(this.cookieservice.get('userType')!= '' && this.cookieservice.get('userType') == 'member'){
          this.route.queryParams.subscribe((params) => {
            this.movieName = params['movieName'];
            this.bookingDate = params['bookingDate'];
            this.bookingTime = params['bookingTime'];
            this.ticketPrice = params['ticketPrice'];
            this.quantity = params['quantity'];
            this.total = params['total'];
            this.status = 'in process';
            this.movieID = params['movieID'];
            console.log(this.movieID);
          });
        }
    }else{
      this.router.navigate(['/home']);
    }
  }

  onBack(){
    console.log('dada');
    this.router.navigate(['/member/movie/movieDetails'], { queryParams: { id: this.movieID } });
  }

}
