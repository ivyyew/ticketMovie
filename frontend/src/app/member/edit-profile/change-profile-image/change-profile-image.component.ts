import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-change-profile-image',
  templateUrl: './change-profile-image.component.html',
  styleUrls: ['./change-profile-image.component.css']
})
export class ChangeProfileImageComponent implements OnInit {
  newImage: string = '';
  fileImage?: File;
  constructor(
    public dialogRef: MatDialogRef<ChangeProfileImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { oriImage: string },
    private cookieservice: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.cookieservice.get('userID') == ''){
      this.router.navigate(['/home']);
    }
  }

  getBase64File(file: File) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.newImage = fileReader.result as string;
    };
    fileReader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  onUploadImage(event: any) {
    this.fileImage = event.target.files[0];
    this.getBase64File(this.fileImage as any);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.fileImage)
      this.dialogRef.close(this.fileImage);
    else return;
  }

}
