import { Component } from '@angular/core';
import { min, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'degital-clock';

  digits: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  secoundHandPosition = 0;
  minuteHandPosition = 0;
  hourHandPosition = 0;
  datetime = {
    year:'',
    month:'',
    day:'',
    hour:'',
    minute:'',
    secound:'',
  }
  
  counter! : Subscription
  constructor() {

  }

  ngOnInit(): void { 
    this.startClock()
  }

  startClock(){
    this.counter = timer(0, 1000).subscribe((res) => {
      let date = new Date();
      let secound = date.getSeconds();
      let minute = date.getMinutes();
      let hour = date.getHours();
      let day = date.getDay();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      this.datetime.year = this.displayDoubleDigits(year) 
      this.datetime.day = this.displayDoubleDigits(day) 
      this.datetime.month = this.displayDoubleDigits(month) 

      this.datetime.hour = this.displayDoubleDigits(hour)
      this.datetime.minute = this.displayDoubleDigits(minute)
      this.datetime.secound = this.displayDoubleDigits(secound)

      this.secoundHandPosition = secound * 6
      this.minuteHandPosition = minute * 6
      this.hourHandPosition = (hour > 11 ? hour - 12 : hour) * 30 + Math.floor(minute / 12) * 6
    });
  }

  displayDoubleDigits(value : number):string{
    return ('00' + value).slice(-2)
  }
}
