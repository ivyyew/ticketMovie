import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  constructor(
    private snakbar: MatSnackBar,
    private authservice: AuthService,
    private router: Router,
    ) {
   }

  ngOnInit(): void {
  }


  async onSubmit(){
      this.username.markAllAsTouched();
      this.password.markAllAsTouched();
      // this.snakbar.open('Register Successfully', '', {duration: 1500});
      if(!this.username.valid || !this.password.valid)
      return;
      let user = await this.authservice.login(this.username.value, this.password.value);

      if(user){
        this.snakbar.open('Login Successfully', '', {duration: 1500});
        if(user.usertype == 'admin'){
          this.router.navigate(['/adminHome']);
        }else{
          this.router.navigate(['/memberHome']);
        }
      }else{
        this.snakbar.open('Login Failed, Please try again', '', {duration: 1500});
      }
      
      
  }
}
