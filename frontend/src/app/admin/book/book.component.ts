import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { book } from 'src/app/models/book/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: book[] = [];
  items: any;
  displayedColumns: string[] = ['bookingID', 'memberName', 'movieName', 'quantity', 'totalPrice', 'ticketDate', 'ticketTime', 'status', 'action'];
  constructor(
    private bookservice: BookService,
    private router: Router,
    private snackbar: MatSnackBar,
    private cookieservice: CookieService
    ) { 
    
  }

  async ngOnInit(){
    if(this.cookieservice.get('userID') == ''){
      this.router.navigate(['/home']);
    }
    this.books= await this.bookservice.getBookingList();
    for(var i=0; i<this.books.length; i++){
      let totalPrice = this.books[i].quantity * this.books[i].ticketPrice;
      this.books[i].total = totalPrice;
    }
    console.log(this.books);
  }

  viewHistory(){
    this.router.navigate(['/admin/bookingList/history']);
  }

  async updateStatus(bookingID: string){
    if (confirm('Collected?')) {
      await this.bookservice.updateStatus(bookingID, 'Collected');
      this.books= await this.bookservice.getBookingList();
      for(var i=0; i<this.books.length; i++){
        let totalPrice = this.books[i].quantity * this.books[i].ticketPrice;
        this.books[i].total = totalPrice;
      }
      this.snackbar.open('Update successfully', 'Close');
    }
  }

}
