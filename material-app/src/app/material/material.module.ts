import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule  } from "@angular/material/button";
import {MatIconModule  } from "@angular/material/icon";


const MaterialComponents=[
  MatButtonModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialComponents,
    MatIconModule
    
  ],
  exports:[
    MaterialComponents,
    MatIconModule
  ]
})
export class MaterialModule { }
