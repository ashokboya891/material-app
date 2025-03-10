import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup,Validators,FormArray } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { debounceTime, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { CustomErrorStateMatcher } from 'src/app/Helpers/CustomErrorStateMatcher';
import { City } from 'src/app/Models/City';
import { Fruit } from 'src/app/Models/Fruit';
import { CitiesService } from 'src/app/services/cities.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
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
  //date-picker
  minDate: Date = new Date("1950-01-01");
  maxDate: Date = new Date("2010-12-31");
  dateHint: string = "Choose date of birth";
  startDate: Date = new Date("2002-01-01");

  

  constructor(private countriesservice:CountriesService,private citiesService: CitiesService) {
    this.formGroup = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      customerName: new FormControl(null,[Validators.required,Validators.maxLength(30),Validators.pattern('[A-Za-z .]*$')]),
      country: new FormControl(null,[Validators.required]),
      city: new FormControl(null),
      receiveNewsLetters: new FormControl(null),  
      hobbies: new FormArray([]),
      allHobbies: new FormControl(false),
      gender: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null),
      studyPeriodStart: new FormControl(null),
      studyPeriodEnd: new FormControl(null),
      expertiseLevel: new FormControl(null),
      fruits: new FormControl(null)

      
    });
     //add form controls to form array
     this.hobbies.forEach(() =>
      {
        this.hobbiesFormArray.push(new FormControl(false));
      });
      this.AllCountriesClicked();

        //chips with autocomplete
    this.filteredFruits = this.getFormControl("fruits").valueChanges.pipe(
      startWith(''),
      map((fruit: string | null) =>
      {
        return fruit ?
          (() =>
          {
            return this.allFruits.filter(fruitObj => fruitObj.name.toLowerCase().indexOf(fruit.toLowerCase()) === 0);
          })()
          : this.allFruits.slice();
      }));
  }
  dateFilter(date:any)
  {
    return date && date.getDay() !== 0 && date.getDay() !== 6;
  }

  onDateChange()
  {
    if (this.formGroup.value.dateOfBirth)
    {
      let date = new Date(this.formGroup.value.dateOfBirth);
      this.dateHint = `You born on ${date.toString().substring(0, date.toString().indexOf(" "))}`;
    }
    else
    {
      this.dateHint = "Choose date of birth";
    }
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
  onOkClick()
  {
    console.log("CLICKED")
  }

  //chips
  All: boolean = true;
  UK: boolean = false;
  USA: boolean = false;
  banks: any[] = [];
  banksOfUK: any[] = [
    { bankName: "HSBC", countryName: "UK" },
    { bankName: "Royal Bank of Scotland", countryName: "UK" },
  ];
  banksOfUSA: any[] = [
    { bankName: "JPMorgan Chase", countryName: "USA" },
    { bankName: "Bank of America", countryName: "USA" },
  ];

  //All chip clicked
  AllCountriesClicked()
  {
    // this.banks = [...this.banksOfUK, ...this.banksOfUSA];
    this.banks = this.banksOfUSA.concat(this.banksOfUK);  //same meaning as above one
    this.All = true;
    this.UK = false;
    this.USA = false;
  }

  //UK chip clicked
  UKClicked()
  {
    this.banks = [...this.banksOfUK];
    this.All = false;
    this.UK = true;
    this.USA = false;
  }

  //USA chip clicked
  USAClicked()
  {
    this.banks = [...this.banksOfUSA];
    this.All = false;
    this.UK = false;
    this.USA = true;
  }

  
  //chips with autocomplete
  allFruits: Fruit[] = [
    { name: "Apple" },
    { name: "Apricot" },
    { name: "Banana" },
    { name: "Blueberry" },
    { name: "Grape" },
    { name: "Honeydew" },
    { name: "Kiwi" },
    { name: "Lemon" },
    { name: "Mandarin" },
    { name: "Mango" },
    { name: "Nectarine" },
    { name: "Orange" },
    { name: "Strawberry" },
    { name: "Watermelon" }
  ];
  filteredFruits: Observable<Fruit[]>;
  fruits: Fruit[] = [
    { name: "Orange" }
  ];

  // separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild("fruitInput")
  fruitInput!: ElementRef<HTMLInputElement>;

  //When the user presses any key like ENTER or COMMA after typing some text in the textbox
  add(event:any): void
  {
    //Add textbox value as chip
    if ((event.value || "").trim())
    {
      this.fruits.push({ name: event.value.trim() });
      this.formGroup.patchValue({ fruits: null });
      this.fruitInput.nativeElement.value = "";
    }
  }

  //When the user clicks (selects) an item in the auto complete
  selected(event:any)
  {
    this.fruits.push({ name: event.option.viewValue });
    this.formGroup.patchValue({ fruits: null });
    this.fruitInput.nativeElement.value = "";
  }

  //When the user clicks on Remove button for this chip
  remove(fruit:any)
  {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0)
    {
      this.fruits.splice(index, 1);
    }
  }
}
