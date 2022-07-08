import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { movie } from 'src/app/models/movie/movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.component.html',
  styleUrls: ['./view-movie.component.css']
})
export class ViewMovieComponent implements OnInit {

  movies: movie[] = [];
  items: any;
  constructor(
    private movieservice: MovieService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cookieservice: CookieService
  ) {

  }

  async ngOnInit() {
    if(this.cookieservice.get('userID')!= ''){
      if(this.cookieservice.get('userType')!= '' && this.cookieservice.get('userType')!= 'admin'){
        this.movies = await this.movieservice.getMovieList();
        for (var i = 0; i < this.movies.length; i++) {
          let imagePath = "./../../assets/img/" + this.movies[i].movieImage;
          this.movies[i].imagePath = imagePath;
        }
      }
    }else{
      this.router.navigate(['/home']);
    }
    
  }

  viewMovie(movieID: string) {
    this.router
      .navigate(['/member/movie/movieDetails'], { queryParams: { id: movieID } })
  }

}
