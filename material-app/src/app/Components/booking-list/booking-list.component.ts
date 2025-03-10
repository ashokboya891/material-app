import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/Models/Booking';
import { BookingsService } from 'src/app/services/bookings.services';
import {MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-bookings-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

   //properties
   bookings!: MatTableDataSource<Booking> ;
   columnsToDisplay: string[] = ['customerName', 'location', 'date', 'actions'];

   @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(private bookingsService: BookingsService) { }
 
   ngOnInit(): void
   {
     this.bookingsService.getBookings().subscribe(
       (response: Booking[]) =>
       {
         this.bookings = new MatTableDataSource<Booking>(response);
 
         this.bookings.paginator = this.paginator;
       },
       (error) =>
       {
         console.log(error);
       }
     );
   }

   //here paginator and matdatasource are binded so if we tap anything in pagination it will inform matadatasource that will inform mattable after that by the inputs it has taken from pagintor it will sort the data
}
