import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { MemberHomeComponent } from './home/member-home/member-home.component';
import { HomeComponent } from './home/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BookComponent } from './admin/book/book.component';
import { HistoryComponent } from './admin/history/history.component';
import { ProfileComponent } from './member/profile/profile.component';
import { EditProfileComponent } from './member/edit-profile/edit-profile.component';
import { ManageMovieComponent } from './admin/manage-movie/manage-movie.component';
import { InsertMovieComponent } from './admin/insert-movie/insert-movie.component';
import { EditMovieComponent } from './admin/edit-movie/edit-movie.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ChangeProfileImageComponent } from './member/edit-profile/change-profile-image/change-profile-image.component';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogModule } from '@angular/material/dialog';
import { ChangePasswordComponent } from './member/edit-profile/change-password/change-password.component';
import { BookingStatusComponent } from './member/booking-status/booking-status.component';
import { ViewBookingComponent } from './member/view-booking/view-booking.component';
import { ViewMovieComponent } from './member/view-movie/view-movie.component';
import { ViewMovieDetailsComponent } from './member/view-movie-details/view-movie-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    MemberHomeComponent,
    HomeComponent,
    BookComponent,
    HistoryComponent,
    ProfileComponent,
    EditProfileComponent,
    ManageMovieComponent,
    InsertMovieComponent,
    EditMovieComponent,
    ChangeProfileImageComponent,
    ChangePasswordComponent,
    BookingStatusComponent,
    ViewBookingComponent,
    ViewMovieComponent,
    ViewMovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    NgImageSliderModule,
    NgbModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
