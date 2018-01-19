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

  constructor(){
    this.timePickerTime = 34200000;
    this.dayPickerDay = new Date();
    this.dayPickerCopy = this.dayPickerDay;
    this.datePickerDate = new Date();
    this.datePickerCopy = this.datePickerDate;
  }
  
  ngOnInit(){
    // this.timePickerTime = 34200000;
    // this.dayPickerDay = new Date();
    // this.dayPickerCopy = this.dayPickerDay;
    // this.datePickerDate = new Date();
    // this.datePickerCopy = this.datePickerDate;
  }
  
  onDayChange(n: number){
    let temp = new Date(n);
    this.dayPickerDay.setFullYear(temp.getFullYear(), temp.getMonth(), temp.getDate());
    this.dayPickerDay.setHours(temp.getHours(), temp.getMinutes(), temp.getSeconds(), temp.getMilliseconds())
  }
  
  updateDay(n: number){
    console.log('updating day');
    let temp = new Date(n);
    this.dayPickerDay.setFullYear(temp.getFullYear(), temp.getMonth(), temp.getDate());
  }

  setToJanuary1(){
    this.dayPickerDay.setFullYear(2017, 0, 1);
    console.log(this.dayPickerDay.toLocaleDateString());
  }

  setToDecember31(){
    this.dayPickerDay.setFullYear(2017, 11, 31);
    console.log(this.dayPickerDay.toLocaleDateString());
  }

  setToJanuary1NineAm(){
    this.datePickerDate.setFullYear(2017, 0, 1);
    this.datePickerDate.setHours(9, 0, 0, 0);
  }

  setToDecember31TenPm(){
    this.datePickerDate.setFullYear(2017, 11, 31);
    this.datePickerDate.setHours(22, 0, 0, 0);
  }
}
