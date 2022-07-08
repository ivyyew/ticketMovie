import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { movie } from 'src/app/models/movie/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { book } from 'src/app/models/book/book';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

interface Time {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-view-movie-details',
  templateUrl: './view-movie-details.component.html',
  styleUrls: ['./view-movie-details.component.css']
})
export class ViewMovieDetailsComponent implements OnInit {
  id: string = '';
  movie?: movie;
  quantity = new FormControl('', [Validators.required]);
  bookingDate = new FormControl('', [Validators.required]);
  bookingTime = new FormControl('', [Validators.required]);
  user: User = <User>{};
  userID: number = 0;
  movieID: string = '';
  movieName: string = '';
  ticketPrice: number = 0;
  minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
  maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 30);
  breakpoint: number = 0;

  constructor(
    private movieservice: MovieService,
    private bookservice: BookService,
    private router: Router,
    private route: ActivatedRoute,
    private snakbar: MatSnackBar,
    private cookieservice: CookieService,
    public userservice: UserService
  ) {
  }

  async ngOnInit() {
    if (this.cookieservice.get('userID') != '') {
      this.user = await this.userservice.currentUser();
      if (this.user) {
        this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
        this.userID = this.user.userID;
        this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
        console.log(this.id);
        });
        this.movie = await this.movieservice.getMovieById(this.id);
        let imagePath = "./../../assets/img/" + this.movie.movieImage;
        this.movie.imagePath = imagePath;
        this.movieID = this.id;
        this.movieName = this.movie.movieName;
        this.ticketPrice = this.movie.ticketPrice;
        console.log(this.movie);
        console.log(this.movieID);
      }
    } else {
      this.router.navigate(['/home']);
    }

  }

  async onSubmit() {
    this.quantity.markAllAsTouched();
    this.bookingDate.markAllAsTouched();
    this.bookingTime.markAllAsTouched();
    if (
      !this.quantity.valid || !this.bookingDate.valid || !this.bookingTime.value
    )
      return;
    const date = new Date(this.bookingDate.value.getFullYear(), this.bookingDate.value.getMonth(), this.bookingDate.value.getDate() + 1);
    const result = await this.bookservice.insertBooking(
      this.quantity.value,
      date,
      this.bookingTime.value,
      this.userID, this.movieID);
    if (result.status == "success") {
      this.snakbar.open('Booking successs!', '', { duration: 1500 });
      this.router
        .navigate(['/member/movie/movieDetails/bookingStatus'], { queryParams: { movieName: this.movieName, bookingDate: this.bookingDate.value, bookingTime: this.bookingTime.value, ticketPrice: this.ticketPrice, quantity: this.quantity.value, total: this.ticketPrice * this.quantity.value, movieID: this.movieID } })
    } else {
      this.snakbar.open('Booking fail...Please try again...', '', { duration: 1500 });
    }


  }



}