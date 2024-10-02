import { inject, Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private API_URL: string = 'https://bored-api.appbrewery.com';
  private CORS_PROXY: string = 'https://cors-anywhere.herokuapp.com/';
  private http = inject(HttpClient);

  constructor() { }

  getRandomActivity(): Observable<Activity>{
    console.log('random http petition');
    return this.http.get<Activity>(`${this.CORS_PROXY}${this.API_URL}/random`);
  }

  getActivityListByType(type: string){
    console.log('typed http petition, type: ', type);
    console.log('http petition: ',`${this.API_URL}/filter?type=${type}`);
    return this.http.get<Activity[]>(`${this.CORS_PROXY}${this.API_URL}/filter?type=${type}`);
  }

}
