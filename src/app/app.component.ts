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
        { eng: 'charity', cat: 'Caritat'},
        { eng: 'cooking', cat: 'Cuina'},
        { eng: 'relaxation', cat: 'Relax'},
        { eng: 'busywork', cat: 'Treball actiu'},
        { eng: 'recreational', cat: 'Recreatiu'},
        { eng: 'random', cat: 'Tant me fa'},
  ];

  public activityType: string = '';
  public currentActivity: string = '';
  public activityByTypeList: Activity[] = [];
  public activeButtonId: string | null = null;
  private activityService = inject(ActivityService);

  constructor() {}

  onClick(event: Event) {

    if (this.activityType === '' || this.activityType === null || this.activityType == undefined){
      alert('Sietplau, selecciona algun tipus d\'activitat');
      return;
    }
    if ((this.activityType === 'random')) {
      this.activityService.getRandomActivity().subscribe({
        next: (response) =>{
          this.currentActivity = response.activity;
        },
        error: (error) => {
          console.log('Error getting random activity: ', error);
        }
      });
    } else {
      this.activityService
        .getActivityListByType(this.activityType)
        .subscribe({
          next: (response) => {
            const randomNumber = this.getRandomNumber(response.length);
            console.log(randomNumber);
            this.currentActivity = response[randomNumber].activity;
          },
          error: (error) => {
            console.log('Error getting typed activity: ', error);
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

}
