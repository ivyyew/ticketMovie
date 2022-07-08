import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { movie } from 'src/app/models/movie/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  id: string = '';
  movie?: movie;
  movieName = new FormControl('', [Validators.required]);
  movieDescription = new FormControl('', [Validators.required]);
  duration = new FormControl('', [Validators.required]);
  ticketPrice = new FormControl('', [Validators.required]);
  // movieName =  new FormControl['',[Validators.required]]);

  constructor(
    private movieservice: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private cookieservice: CookieService
  ) {

  }

  async ngOnInit() {
    if(this.cookieservice.get('userID') == ''){
      this.router.navigate(['/home']);
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.movie = await this.movieservice.getMovieByID(this.id);
    this.movieName.setValue(this.movie.movieName);
    this.movieDescription.setValue(this.movie.movieDescription);
    this.duration.setValue(this.movie.duration);
    this.ticketPrice.setValue(this.movie.ticketPrice);
  }
  async onSubmit() {
    await this.movieservice.updateMovie(this.id, this.movieName.value, this.movieDescription.value, this.duration.value, this.ticketPrice.value);
    this.router.navigate(["/admin/movieList"]);
  }

}



