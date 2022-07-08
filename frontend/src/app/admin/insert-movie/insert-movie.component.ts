import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MovieService } from 'src/app/services/movie/movie.service';

@Component({
  selector: 'app-insert-movie',
  templateUrl: './insert-movie.component.html',
  styleUrls: ['./insert-movie.component.css']
})
export class InsertMovieComponent implements OnInit {
  form?: FormGroup;
  fileImage?: File;
  imageSrc = '';

  movieName = new FormControl('');
  movieDescription = new FormControl('');
  image = new FormControl('');
  duration = new FormControl('');
  ticketPrice = new FormControl('');

  constructor(
    private formBuilder: FormBuilder,
    private movieservice: MovieService,
    private snackbar: MatSnackBar,
    private router: Router,
    private cookieservice: CookieService
  ) { }

  ngOnInit() {
    if(this.cookieservice.get('userID') == ''){
      this.router.navigate(['/home']);
    }
  }




  getBase64File(file: File) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.imageSrc = fileReader.result as string;
    };
    fileReader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onFileSelect(event: any) {
    this.fileImage = event.target.files[0];
    this.getBase64File(this.fileImage as any);
  }

  async onSubmit() {
    this.movieName.markAllAsTouched();
    this.movieDescription.markAllAsTouched();
    this.image.markAllAsTouched();
    this.duration.markAllAsTouched();
    this.ticketPrice.markAllAsTouched();
    if(!this.movieName.valid || !this.movieDescription.valid || ! this.image.valid || ! this.duration.valid || !this.ticketPrice.valid)
    return;
    await this.movieservice.addMovie(this.movieName.value, this.movieDescription.value, this.fileImage as File, this.duration.value, this.ticketPrice.value);
    console.log('here');
    this.snackbar.open('Insert Successfully', '', { duration: 1500 });
    this.router.navigate(['/admin/movieList']);

  }

  onBack(){
    this.router.navigate(['/admin/movieList']);
  }
}
