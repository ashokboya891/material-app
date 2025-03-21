import { Component, OnInit, ViewChild } from '@angular/core';
import { Booking } from 'src/app/Models/Booking';
import { BookingsService } from 'src/app/services/bookings.services';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup,FormControl  } from "@angular/forms";
@Component({
  selector: 'app-bookings-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {



  //properties
  bookings!: MatTableDataSource<Booking>;
  columnsToDisplay: string[] = ['customerName', 'location', 'date', 'actions'];
  isLoadingCompleted: boolean = false;
  rows: Booking[] = [];
  bookingLoadingStatus: string = "Loading...";
  isError: boolean = false;
  totalCount: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  formGroup!:FormGroup;
  constructor(private bookingsService: BookingsService) { 
    this.formGroup = new FormGroup({
    search:new FormControl(null)
  });
}

  ngOnInit(): void {
    // Fetch bookings from API
    this.bookingsService.getBookings().subscribe(
      (response: Booking[]) => {
        // Bind response to the table
        this.bookings = new MatTableDataSource<Booking>(response);
  
        // Set paginator and sorting
        this.bookings.paginator = this.paginator;
        this.bookings.sort = this.sort;
        this.rows = response;
        this.totalCount = response.length;
  
        // Check if data is empty
        if (response.length === 0) {
          this.bookingLoadingStatus = "❌ No data to fetch";
        } else {
          this.bookingLoadingStatus = "✔ Total Bookings: " + response.length;
        }
  
        // Loading completed
        this.isLoadingCompleted = true;
      },
      (error) => {
        // Handle error
        console.log(error);
        this.bookingLoadingStatus = "❌ Error fetching the data";
        this.isError = true;
        this.isLoadingCompleted = true;
      }
    );
  }
  filterBookings()
  {
    this.formGroup.value;
    const search = this.formGroup.get('search')?.value;
    console.log(search);
    if(this.formGroup.value!=null && this.bookings)
    {
      this.bookings.filter=this.formGroup.value.search.trim();
    }
  }
  clearFilter()
  {
    this.formGroup.patchValue({search:""})
    this.filterBookings();
  }
}
