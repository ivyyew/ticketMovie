import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  newPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  
  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>, private cookieservice: CookieService, private router: Router) { }

  ngOnInit(): void {
    if(this.cookieservice.get('userID') == ''){
      this.router.navigate(['/home']);
    }
  }

  get passwordNotMatch(){
    let nP = this.newPassword.value;
    let cP = this.confirmPassword.value;
    return(this.newPassword.value && this.confirmPassword.value && nP != cP);
  }

  get formNotComplete(){
    return(!this.passwordNotMatch &&this.confirmPassword.value && this.currentPassword.value && this.newPassword.value);
  }

  onSubmit(){
    let nP = this.newPassword.value;
    let cP = this.currentPassword.value;
    this.dialogRef.close({
      currentPassword: cP,
      newPassword: nP,
    });
  }

  onCancel(){
    this.dialogRef.close();
  }
}
