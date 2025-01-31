import { AbstractControl, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CustomErrorStateMatcher implements ErrorStateMatcher
{
    isErrorState(control: FormControl, form: FormGroupDirective):boolean {
        return form && control && control.invalid && (control.dirty || control.touched || form.submitted);
    }
}