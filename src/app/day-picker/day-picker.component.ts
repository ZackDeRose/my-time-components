import {
  Component, forwardRef, DoCheck, ViewChild, AfterViewInit, Injectable, ViewEncapsulation,
  Input, ElementRef, Output, OnInit, OnChanges, EventEmitter
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgbDateParserFormatter, NgbDatepicker, NgbDateStruct, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {MyNgbDateParserFormatter} from "../my-nbg-date-parser-formatter";
import {Observable} from "rxjs";


@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: [
    './day-picker.component.css'
  ],
  providers: [
    // DAY_PICKER_CONTROL_VALUE_ACCESSOR,
    {
      provide: NgbDateParserFormatter,
      useClass: MyNgbDateParserFormatter
    }
  ],
  host: {
    '(document:click)': 'onClick($event)'
  }
})
export class DayPickerComponent implements OnInit, OnChanges, DoCheck {
  private dayObject: {year: number, month: number, day: number};
  @Input() date: Date;
  @Input() disabled: boolean;
  // @Output() updatedDate: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild(NgbInputDatepicker) calendar: NgbInputDatepicker;
  previousDateValue: number;
  previousDayValue: number;
  
  constructor(private _eref: ElementRef) {}
  
  ngOnInit():void {
    this.dayObject = {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()};
    this.previousDateValue = this.date.getTime();
    this.previousDayValue = this.getIdentifier(this.dayObject);
  }
  
  getIdentifier(obj: {year: number, month: number, day: number}): number {
    return obj.year * 10000 + obj.month * 100 + obj.day;
  }
  
  ngOnChanges(): void {
    console.log('in on changes');
    if (this.dayObject) {
      this.date.setFullYear(this.dayObject.year, this.dayObject.month - 1, this.dayObject.day);
    }
  }
  
  datesAreInSync(): boolean {
    let temp = {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()};
    if(this.dayObject.year !== temp.year) return false;
    if(this.dayObject.month !== temp.month) return false;
    if(this.dayObject.day !== temp.day) return false;
  }

  ngDoCheck() {
    // console.log('doCheck of DayPicker');
    if(this.date.getTime() !== this.previousDateValue) {
      this.dayObject = {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()};
      this.previousDateValue = this.date.getTime();
      this.previousDayValue = this.getIdentifier(this.dayObject);
      // this.updatedDate.emit(this.date.getTime());
    }
    if(this.getIdentifier(this.dayObject) !== this.previousDayValue){
      this.date.setFullYear(this.dayObject.year, this.dayObject.month - 1, this.dayObject.day);
      this.previousDateValue = this.date.getTime();
      this.previousDayValue = this.getIdentifier(this.dayObject);
      // this.updatedDate.emit(this.date.getTime());
    }
  }

  onClick(event){
    if(!this._eref.nativeElement.contains(event.target)){
      this.calendar.close();
    }
  }
}
