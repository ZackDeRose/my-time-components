import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'My time components';
  timePickerTime: number;
  dayPickerDay: Date;
  dayPickerCopy: Date;
  datePickerDate: Date;
  datePickerCopy: Date;

  ngOnInit(){
    this.timePickerTime = 34200000;
    this.dayPickerDay = new Date(Date.now());
    this.dayPickerCopy = this.dayPickerDay;
    this.datePickerDate = new Date();
    this.datePickerCopy = this.datePickerDate;
  }

  setToTomorrow(){
    this.dayPickerDay = new Date(Date.now() + 24*1000*60*60);
  }

  setToYesterday(){
    this.dayPickerDay = new Date(Date.now() - 24*1000*60*60);
  }

  setToTomorrowNineAm(){
    this.datePickerDate = new Date(2017, 9, 9, 21, 0, 0, 0);
  }

  setToYesterdayTenAm(){
    this.datePickerDate = new Date(2017, 9, 7, 10);
  }
}
