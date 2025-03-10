import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule  } from "./material/material.module";
import { BookingComponent } from './Components/booking/booking.component';
import {  FormsModule,ReactiveFormsModule} from "@angular/forms";
import { MAT_DATE_LOCALE,DateAdapter,MatDateFormats, MAT_DATE_FORMATS } from "@angular/material/core";
import { MAT_MOMENT_DATE_FORMATS,MomentDateAdapter,MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatChipsModule  } from "@angular/material/chips";
import { BookingListComponent } from './Components/booking-list/booking-list.component';
export const MY_FORMATS = {
  parse: { dateInput: 'LL' },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM YYYY',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    BookingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,FormsModule
  ],
  providers: [
    //format for country base culture like fe-FR (french)
    //{provide: MAT_DATE_LOCALE,useValue:"de-DE"}
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [
        MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS
      ]
    },
    {provide:MAT_DATE_FORMATS,useValue:MY_FORMATS}
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
