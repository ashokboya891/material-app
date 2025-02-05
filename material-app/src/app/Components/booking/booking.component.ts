import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators,FormArray } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs';
import { CustomErrorStateMatcher } from 'src/app/Helpers/CustomErrorStateMatcher';
import { City } from 'src/app/Models/City';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

countries:any;
formGroup:FormGroup;
customErrorStateMatcher:CustomErrorStateMatcher=new CustomErrorStateMatcher();
isCitiesLoading: boolean = false;
cities: City[]=[];

 //checkbox-group
 hobbies: any[] = [
  { id: 1, hobbyName: "Music" },
  { id: 2, hobbyName: "Food" },
  { id: 3, hobbyName: "Travel" },
  { id: 4, hobbyName: "Pets" },
  { id: 5, hobbyName: "Hiking" },
];

  constructor(private countriesservice:CountriesService,private citiesService: CitiesService) {
    this.formGroup = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      customerName: new FormControl(null,[Validators.required,Validators.maxLength(30),Validators.pattern('[A-Za-z .]*$')]),
      country: new FormControl(null,[Validators.required]),
      city: new FormControl(null),
      receiveNewsLetters: new FormControl(null),  
      hobbies: new FormArray([]),
      allHobbies: new FormControl(false),
      gender: new FormControl(null, [Validators.required])

      
    });
     //add form controls to form array
     this.hobbies.forEach(() =>
      {
        this.hobbiesFormArray.push(new FormControl(false));
      });
  }
  hobbiesFormArrayControl(i:number):FormControl{
    return this.hobbiesFormArray.at(i) as FormControl;
  }

    //returns the form array
    get hobbiesFormArray(): FormArray
    {
      return this.formGroup.get("hobbies") as FormArray;
    }
    //executes when the user clicks on "All" checkbox for hobbies
  onAllHobbiesCheckBoxChange()
  {
    this.hobbiesFormArray.controls.forEach((hobby, index) =>
    {
      this.hobbiesFormArray.at(index).patchValue(this.formGroup.value.allHobbies);
    });
  }

  //returns true, if all hobby checkboxes are checked
  allHobbiesSelected()
  {
    return this.hobbiesFormArray.value.every((val:boolean) => val === true); //[true, true, true, true, true]
  }

  //returns true, if all hobby checkboxes are unchecked
  noHobbiesSelected()
  {
    return this.hobbiesFormArray.value.every((val:boolean) => val === false); //[false, false, false, false, false]
  }

  //executes when the user checks / unchecks any hobby checkbox
  onHobbyChange(i:number)
  {
    if (this.allHobbiesSelected())
      this.formGroup.patchValue({ allHobbies: true });
    else
      this.formGroup.patchValue({ allHobbies: false });
  }

  ngOnInit(): void
  {
    //countries
    this.countriesservice.getCountries().subscribe(
      (response) =>
      {
        this.countries = response;
      },
      (error) =>
      {
        console.log(error);
      });

    //ngOnInit
    this.getFormControl("city").valueChanges
    .pipe(
      debounceTime(100),
      tap(() => {
        this.cities = [];
        this.isCitiesLoading = true;
      }),
      switchMap((value) =>
        this.citiesService.getCities().pipe(
          tap(() => this.isCitiesLoading = false) // Stop loading after data is fetched
        )
      )
    )
    .subscribe((response) => {
      this.cities = response.filter(city =>
        city.cityName.toLowerCase().startsWith(this.getFormControl("city").value.toLowerCase())
      );
    });
  
  }

   //returns the form control instance based on the control name
   getFormControl(controlName: string): FormControl
   {
     return this.formGroup.get(controlName) as FormControl;
   }
  //returns the error message based on the given control and error
  getErrorMessage(controlName: string, errorType: string): string
  {
    //controlName = "customerName"
    //errorType = "required"
    switch (controlName)
    {
      case "customerName":
        {
          if (errorType === "required")
            return "You must specify <strong>Name</strong>";
          else if (errorType === "maxlength")
            return "<strong>Name</strong> can contain up to 30 characters only";
          else if (errorType === "pattern")
            return "<strong>Name</strong> can contain alphabets or dot (.) or space only";
          else
            return "";
        }

      case "email":
        {
          if (errorType === "required")
            return "<strong>Email</strong> can't be blank";
          else if (errorType === "email")
            return "<strong>Email</strong> should be in correct format. Eg: someone@example.com";
          else
            return "";
        }

      case "country":
        {
          if (errorType === "required")
            return "You must choose a <strong>Country</strong>";
          else
            return "";
        }
        case "gender":
          {
            if (errorType === "required")
              return "Choose gender either Male or Female or Others";
            else
              return "";
          }

      default: return "";
    }
  }
}
