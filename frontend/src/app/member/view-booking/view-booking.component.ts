import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user/user';
import { book } from 'src/app/models/book/book';
import { BookService } from 'src/app/services/book/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {
  userID: number = 0;
  // item: any;
  books: book[] = [];
  displayedColumns: string[] = ['bookingID', 'movieName', 'ticketPrice', 'quantity', 'totalPrice', 'ticketDate', 'ticketTime', 'status'];
  user: User = <User>{};

  constructor(
    private cookieservice: CookieService,
    public userservice: UserService,
    private router: Router,
    private bookservice: BookService,) {
  }

  async ngOnInit() {
    if (this.cookieservice.get('userID')!= '') {
      this.user = await this.userservice.currentUser();
      if (this.user) {
        this.userID = this.user.userID;
        this.books = await this.bookservice.getBookingListById(this.userID);
        for (var i = 0; i < this.books.length; i++) {
          let totalPrice = this.books[i].quantity * this.books[i].ticketPrice;
          this.books[i].total = totalPrice;

        }
        console.log(this.books);
      }
    } else {
      this.router.navigate(['/home']);
    }

  }

}
