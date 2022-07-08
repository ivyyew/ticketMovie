import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { movie } from 'src/app/models/movie/movie';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-manage-movie',
  templateUrl: './manage-movie.component.html',
  styleUrls: ['./manage-movie.component.css']
})
export class ManageMovieComponent implements OnInit {
  movies: movie[] = [];
  items: any;
  displayedColumns: string[] = ['movieID', 'imagePath', 'movieName', 'movieDescription', 'duration', 'ticketPrice', 'action'];
  constructor(
    private movieservice: MovieService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cookieservice: CookieService
    ) {

  }

  async ngOnInit() {
    if(this.cookieservice.get('userID') != ''){
      this.movies = await this.movieservice.getMovieList();
      for (var i = 0; i < this.movies.length; i++) {
        let imagePath = "../../../assets/img/" + this.movies[i].movieImage;
        this.movies[i].imagePath = imagePath;
        console.log(this.movies[i].imagePath);

      }
    }else{
      this.router.navigate(['/home']);
    }
   
  }

  async getMovieByID(movieID: string) {
    this.router
      .navigate(['/admin/editMovie'], { queryParams: { id: movieID } })
  }

  async deleteMovie(movieID: string) {
    if (confirm('Delete?')) {
      let result = await this.movieservice.deleteMovie(movieID);

      this.movies = await this.movieservice.getMovieList();
      for (var i = 0; i < this.movies.length; i++) {
        let imagePath = "../../../assets/img/" + this.movies[i].movieImage;
        this.movies[i].imagePath = imagePath;
      }
      this.snackbar.open('Delete successfully', 'Close');

    }

  }

  async insertMovie() {
    this.router.navigate(['/admin/insertMovie']);
  }

}
