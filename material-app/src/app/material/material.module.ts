import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule  } from "@angular/material/button";
import {MatIconModule  } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioModule } from "@angular/material/radio";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import{MatButtonToggleModule} from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import {  MatPaginatorModule} from "@angular/material/paginator";
import {  MatSortModule} from "@angular/material/sort";
import {  MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const MaterialComponents=[
  MatButtonModule,
  MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
MatProgressSpinnerModule

    
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents,
  ],
  exports:[
    MaterialComponents,

  ]
})
export class MaterialModule { }
