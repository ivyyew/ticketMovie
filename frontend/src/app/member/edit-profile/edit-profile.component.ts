import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeProfileImageComponent } from './change-profile-image/change-profile-image.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User = <User>{};
  login = new FormControl('');
  password = new FormControl('');
  fullname = new FormControl('', [Validators.required]);

  constructor(
    private userservice: UserService,
    private router: Router,
    private cookieservice: CookieService,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  async ngOnInit() {
    if (this.cookieservice.get('userID') != '') {
      this.user = await this.userservice.currentUser();
      if (this.user) {
        this.user.photo = '../../../assets/img/' + this.user.photo;
        this.login.setValue(this.user.login);
        this.password.setValue("******");
        this.fullname.setValue(this.user.fullname);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }


  async onSubmit() {
    this.login.markAllAsTouched();
    this.password.markAllAsTouched();
    this.fullname.markAllAsTouched();
    if (!this.fullname.valid)
      return;

    const user = await this.userservice.updateFullName(this.user.userID, this.fullname.value);
    if (user.status == "success") {
      this.snackbar.open('Update Successfully', '', { duration: 1500 });
      this.router.navigate(['/member/profile']);
    }
    else
      this.snackbar.open('Update Failed, Please try again', '', { duration: 1500 });
  }

  async updatePass() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        if (result.currentPassword != this.user.password) {
          this.snackbar.open('Update Failed, Please try again', '', { duration: 1500 });
        } else {
          let updateResult = await this.userservice.updatePassword(this.user.userID, result.newPassword);
          if (updateResult.status == 'success') {
            this.snackbar.open('Update Successfully', '', { duration: 1500 });
          } else {
            this.snackbar.open('Update Failed, Please try again', '', { duration: 1500 });
          }
        }
      }
    });
  }

  updateProfileImage() {
    const dialogRef = this.dialog.open(ChangeProfileImageComponent, {
      width: '700px',
      data: { oriImage: this.user.photo },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        let newImage = await this.userservice.updateProfileImage(this.user.userID, result);
        if (!newImage) {
          console.log(newImage);
          this.snackbar.open('Update Profile Successfully', '', { duration: 1500 });
        } else {
          this.snackbar.open('Updated Failed, Please try again', '', { duration: 1500 });
        }
      }
    });
  }



}