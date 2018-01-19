import {
  Component, DoCheck, ElementRef, forwardRef, Input, OnChanges, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgbDateParserFormatter, NgbDatepicker, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {MyNgbDateParserFormatter} from "../my-nbg-date-parser-formatter";


@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: MyNgbDateParserFormatter
    }
  ],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class DatePickerComponent implements OnInit, DoCheck {
  private dayObject: {year: number, month: number, day: number};
  private timeObject: {hour: number, minute: number, second: number};
  @Input() date: Date;
  @Input() disabled: boolean;
  @ViewChild(NgbInputDatepicker) calendar: NgbInputDatepicker;
  previousDateValue: number;
  previousDateObjValue: number;
  
  constructor(private _eref: ElementRef) {}
  
  ngOnInit(): void {
    this.dayObject = {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()};
    this.timeObject = {hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds()};
    this.previousDateValue = this.date.getTime();
    this.previousDateObjValue = this.getDateObjValue();
  }
  
  getDateObjValue(): number {
    let toReturn = 0;
    toReturn += this.dayObject.year * 10000 + this.dayObject.month * 100 + this.dayObject.day;
    toReturn += this.timeObject.second * 100000000 + this.timeObject.minute * 10000000000 + this.timeObject.hour * 1000000000000;
    return toReturn;
  }
  
  ngDoCheck() {
    if(this.date.getTime() !== this.previousDateValue){
      this.dayObject = {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()};
      this.timeObject = {hour: this.date.getHours(), minute: this.date.getMinutes(), second: this.date.getSeconds()};
      this.previousDateValue = this.date.getTime();
      this.previousDateObjValue = this.getDateObjValue();
    }
    if(this.getDateObjValue() !== this.previousDateObjValue){
      this.date.setFullYear(this.dayObject.year, this.dayObject.month -1, this.dayObject.day);
      this.date.setHours(this.timeObject.hour, this.timeObject.minute, this.timeObject.second, 0);
      this.previousDateValue = this.date.getTime();
      this.previousDateObjValue = this.getDateObjValue();
    }
  }

  onClick(event){
    if(!this._eref.nativeElement.contains(event.target)){
      this.calendar.close();
    }
  }

  closeCalendar(){
    console.log('triggered');
    this.calendar.close();
  }

}
