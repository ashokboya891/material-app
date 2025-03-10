import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/Models/Booking';
import { BookingsService } from 'src/app/services/bookings.services';
@Component({
  selector: 'app-bookings-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

   //properties
   bookings: Booking[] = [];
   columnsToDisplay: string[] = ['customerName', 'location', 'date', 'actions'];
 
   constructor(private bookingsService: BookingsService) { }
 
   ngOnInit(): void
   {
     this.bookingsService.getBookings().subscribe(
       (response: Booking[]) =>
       {
         this.bookings = response;
       },
       (error) =>
       {
         console.log(error);
       }
     );
   }
}
