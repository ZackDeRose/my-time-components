import {Component, forwardRef, DoCheck, ViewChild, AfterViewInit, Injectable} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgbDateParserFormatter, NgbDatepicker, NgbDateStruct, NgbInputDatepicker} from "@ng-bootstrap/ng-bootstrap";
import {MyNgbDateParserFormatter} from "../my-nbg-date-parser-formatter";

const noop = () => {};

export const DAY_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DayPickerComponent),
  multi: true
};

@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.css'],
  providers: [
    DAY_PICKER_CONTROL_VALUE_ACCESSOR,
    {
      provide: NgbDateParserFormatter,
      useClass: MyNgbDateParserFormatter
    }
  ]
})
export class DayPickerComponent implements ControlValueAccessor, DoCheck {
  private innerValue: Date = new Date(Date.now());
  private dayObject: {year: number, month: number, day: number};
  
  private onTouchedCallback: () => void = noop;
  private onChangedCallback: (_: any) => void = noop;
  
  get value(): Date {
    // console.log('in get');
    this.value = new Date(this.dayObject.year, this.dayObject.month -1, this.dayObject.day);
    return this.innerValue;
  }
  
  set value(v: Date){
    if(v.getTime() !== this.innerValue.getTime()){
      this.innerValue = v;//setFullYear(v.getFullYear(), v.getMonth(), v.getDate());
      let years = this.innerValue.getFullYear();
      let months = this.innerValue.getMonth() + 1;
      let days = this.innerValue.getDate();
      this.dayObject = {year: years, month: months, day: days};
      this.onChangedCallback(v);
    }
  }
  
  writeValue(value: Date){
    if(value === null) {
      value = new Date(Date.now());
    }
    if(value.getTime() !== this.innerValue.getTime()){
      this.innerValue = value; //.setFullYear(value.getFullYear(), value.getMonth(), value.getDate());
      let years = this.innerValue.getFullYear();
      let months = this.innerValue.getMonth() + 1;
      let days = this.innerValue.getDate();
      this.dayObject = {year: years, month: months, day: days};
    }
  }
  
  registerOnChange(fn: (_: any) => void): void{
    this.onChangedCallback = fn;
  }
  
  registerOnTouched(fn: any){
    this.onTouchedCallback = fn;
  }
  
  ngDoCheck() {
    // console.log('in do check');
    if (this.dayObject) {
      this.value.setFullYear(this.dayObject.year, this.dayObject.month - 1, this.dayObject.day);
      // console.log('sending onchanged callback');
      // this.onChangedCallback(this.value);
    }
  }
}
