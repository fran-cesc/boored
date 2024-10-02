import { inject, Injectable } from '@angular/core';
import { Activity } from '../interfaces/activity.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private API_URL: string = 'https://bored-api.appbrewery.com';
  private API_PROXY_URL: string = '/api';

  private http = inject(HttpClient);

  constructor() { }

  getRandomActivity(): Observable<Activity>{
    return this.http.get<Activity>(`${this.API_PROXY_URL}/random`);
  }

  getActivityListByType(type: string){
    return this.http.get<Activity[]>(`${this.API_PROXY_URL}/filter?type=${type}`);
  }

}
