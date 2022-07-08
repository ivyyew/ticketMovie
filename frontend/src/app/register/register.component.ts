import { Component, OnInit } from '@angular/core';
import {  FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  fullname = new FormControl('', [Validators.required]);
  constructor(
    private snakbar : MatSnackBar,
    private authservice: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  async onSubmit(){
    this.username.markAllAsTouched();
    this.password.markAllAsTouched();
    this.fullname.markAllAsTouched();
    if(!this.username.valid || !this.password.valid || !this.fullname.valid)
    return;
    
    const newuser = await this.authservice.register(this.fullname.value, this.username.value, this.password.value);
    if(newuser.status == "success"){
      this.snakbar.open('Register Successfully', '', {duration: 1500});
      this.router.navigate(['/login']);
    }
    else
     this.snakbar.open('Register Failed, Please try again', '', {duration: 1500});
  }
}
