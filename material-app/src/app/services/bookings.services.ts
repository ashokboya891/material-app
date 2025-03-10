import { HttpClient } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { Booking } from "../Models/Booking";

@Injectable({
providedIn:"root",

})
export  class BookingsService
{
    
    constructor(private httpclient:HttpClient)
    {

    }
    getBookings():Observable<Booking[]>
    {
     return this.httpclient.get<Booking[]>('http://localhost:3000/bookings');
    }
}