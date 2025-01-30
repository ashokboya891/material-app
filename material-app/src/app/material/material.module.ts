import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule  } from "@angular/material/button";
import {MatIconModule  } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

const MaterialComponents=[
  MatButtonModule,
  MatIconModule,
    MatFormFieldModule,
    MatInputModule,
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
