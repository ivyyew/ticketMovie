import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private cookieservice: CookieService) { }

  currentUser(): Promise<User> {
    let id = this.cookieservice.get('userID');
    console.log(id);
    let user = this.http.get<User>(`${this.apiUrl}/user/${id}`).toPromise();
    return user;
  }

  updateFullName(userID: number, fullname: string): Promise<any> {
    let result = this.http.put(`${this.apiUrl}/user/${userID}`, { fullname }).toPromise();
    return result;
  }

  updatePassword(userID: number, password: string): Promise<any> {
    let result = this.http.put(`${this.apiUrl}/user/updatePassword/${userID}`, { password }).toPromise();
    return result;
  }

  updateProfileImage(userID: number, file: File): Promise<string> {
    const uploadData = new FormData();
    console.log(file.name);
    uploadData.append('image', file, file.name);
    return this.http
      .post<string>(`${this.apiUrl}/user/updateImage/${userID}`, uploadData)
      .toPromise();
  }

}
