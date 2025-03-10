import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './Components/booking/booking.component';
import { BookingListComponent } from './Components/booking-list/booking-list.component';

const routes: Routes = [
  {path:"booking",component:BookingComponent},
  { path: "bookings-list", component: BookingListComponent },
  { path: "", redirectTo: "/bookings-list", pathMatch: "full" },
  { path: "**", redirectTo: "/bookings-list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
