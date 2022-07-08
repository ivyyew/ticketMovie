import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './admin/book/book.component';
import { EditMovieComponent } from './admin/edit-movie/edit-movie.component';
import { HistoryComponent } from './admin/history/history.component';
import { InsertMovieComponent } from './admin/insert-movie/insert-movie.component';
import { ManageMovieComponent } from './admin/manage-movie/manage-movie.component';
import { AdminHomeComponent } from './home/admin-home/admin-home.component';
import { HomeComponent } from './home/home/home.component';
import { MemberHomeComponent } from './home/member-home/member-home.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './member/edit-profile/edit-profile.component';
import { ProfileComponent } from './member/profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ViewMovieComponent } from './member/view-movie/view-movie.component';
import { ViewMovieDetailsComponent } from './member/view-movie-details/view-movie-details.component';
import { BookingStatusComponent } from './member/booking-status/booking-status.component';
import { ViewBookingComponent } from './member/view-booking/view-booking.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'adminHome',
    component: AdminHomeComponent
  },
  {
    path: 'memberHome',
    component: MemberHomeComponent
  },
  {
    path: 'admin/movieList',
    component: ManageMovieComponent
  },
  {
    path: 'admin/editMovie',
    component: EditMovieComponent
  },
  {
    path: 'admin/insertMovie',
    component: InsertMovieComponent
  },
  {
    path: 'admin/bookingList',
    component: BookComponent,
  },
  {
    path: 'admin/bookingList/history',
    component: HistoryComponent
  },

  {
    path: 'member/profile',
    component: ProfileComponent
  },
  {
    path: 'member/profile/edit',
    component: EditProfileComponent
  },
  {
     path: 'member/movie',
     component: ViewMovieComponent
   },
   {
     path: 'member/movie/movieDetails',
     component: ViewMovieDetailsComponent
   },
   {
     path: 'member/movie/movieDetails/bookingStatus',
     component: BookingStatusComponent
   },
   {
     path: 'member/booking',
     component: ViewBookingComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
