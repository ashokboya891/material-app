import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

countries:any;
formGroup:FormGroup;
  constructor(private countriesservice:CountriesService) {
    this.formGroup = new FormGroup({
      email: new FormControl(null),
      customerName: new FormControl(null),
      country: new FormControl(null)
    });
  }
  ngOnInit(): void {
    this.countriesservice.getCountries().subscribe(
      (resp)=>{
        this.countries=resp;
      },
      error=>{
        console.log(error);
      }
    );
  }

}
