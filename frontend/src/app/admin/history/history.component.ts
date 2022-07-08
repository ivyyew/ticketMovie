import { Component, OnInit } from '@angular/core';
import { book } from 'src/app/models/book/book';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  books: book[] = [];
  items: any;
  displayedColumns: string[] = ['bookingID', 'memberName', 'movieName', 'quantity', 'totalPrice', 'ticketDate', 'ticketTime', 'status'];
  constructor(private bookservice: BookService) { }

  async ngOnInit(){
    
    this.books= await this.bookservice.getHistoryList();
    for(var i=0; i<this.books.length; i++){
      let totalPrice = this.books[i].quantity * this.books[i].ticketPrice;
      this.books[i].total = totalPrice;
    }
    console.log(this.books);
  }

}
