import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../Models/City';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient: HttpClient) { }


  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(`http://localhost:3000/cities`);
  }
}
