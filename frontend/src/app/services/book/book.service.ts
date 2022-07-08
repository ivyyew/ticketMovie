import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { book } from 'src/app/models/book/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { 
  }

  getBookingList(): Promise<book[]>{
    let books = this.http.get<book[]>(`${this.apiUrl}/book`).toPromise();
    return books;
  }

  getHistoryList(): Promise<book[]>{
    let books = this.http.get<book[]>(`${this.apiUrl}/book/collected`).toPromise();
    return books;
  }

  updateStatus(bookingID: string, status: string): Promise<any>{
    let result = this.http.put(`${this.apiUrl}/book/${bookingID}`,{status}).toPromise();
    return result;
  }

  getBookingListById(userID: number): Promise<book[]> {
    let books = this.http.get<book[]>(`${this.apiUrl}/book/${userID}`).toPromise();
    return books;
  }

  insertBooking(quantity: number, bookingDate: Date, bookingTime: string, userID: number, movieID: string): Promise<book> {
    return this.http.post<book>(`${this.apiUrl}/book`, { quantity: quantity, bookingDate: bookingDate, bookingTime: bookingTime, userID: userID, movieID: movieID }).toPromise();
  }

}
