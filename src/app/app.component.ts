import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ActivityService } from './services/activity.service';
import { Activity, ActivityByLang } from './interfaces/activity.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  public langButtonList: ActivityByLang[] = [
        { eng: 'social', cat: 'Social'},
        { eng: 'education', cat: 'Educació'},
        { eng: 'charity', cat: 'Caritat'},
        { eng: 'cooking', cat: 'Cuina'},
        { eng: 'relaxation', cat: 'Relax'},
        { eng: 'busywork', cat: 'Treball actiu'},
        { eng: 'recreational', cat: 'Recreatiu'},
        { eng: 'random', cat: 'Tant me fa'},
  ];

  public activityType: string = '';
  public translatedActivityType: string = '';
  public currentActivity: string = '';
  public activityByTypeList: Activity[] = [];
  public activeButtonId: string | null = null;
  private API_NOT_WORKING_TEXT: string = 'En aquests moments la API no pot proporcionar una activitat de tipus: ';
  private activityService = inject(ActivityService);

  constructor() {}

  onClick(event: Event) {
    if (this.activityType === '' || this.activityType === null || this.activityType == undefined){
      alert('Sietplau, selecciona algun tipus d\'activitat');
      return;
    }
    this.translatedActivityType = this.translateActivity(this.activityType);
    if ((this.activityType === 'random')) {
      this.activityService.getRandomActivity().subscribe({
        next: (response) =>{
          this.currentActivity = response.activity;
        },
        error: (error) => {
          console.log('Error getting random activity: ', error);
          this.currentActivity = (`${this.API_NOT_WORKING_TEXT}${this.translatedActivityType}`);
        }
      });
    } else {
      this.activityService
        .getActivityListByType(this.activityType)
        .subscribe({
          next: (response) => {
            const randomNumber = this.getRandomNumber(response.length);
            this.currentActivity = response[randomNumber].activity;
          },
          error: (error) => {
            console.log('Error getting typed activity: ', error);
            this.currentActivity = (`${this.API_NOT_WORKING_TEXT}${this.translatedActivityType}`);
          }
          });
    }
  }

  getActivityType(event: Event) {
    this.activityType = (event.target as HTMLElement).id;
    this.activeButtonId = this.activityType;
  }

  getRandomNumber(max: number) {
    return Math.floor(Math.random() * (max + 1));
  }

  setActiveButton(buttonId: string): void {
    this.activeButtonId = buttonId;
  }

  translateActivity( activity: string ){
    const findActivity = this.langButtonList.find( item => item.eng === activity);
    return findActivity ? findActivity.cat : activity;
  }
}
