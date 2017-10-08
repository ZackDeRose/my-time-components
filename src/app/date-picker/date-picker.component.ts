import {Component, DoCheck, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {MyNgbDateParserFormatter} from "../my-nbg-date-parser-formatter";

const noop = () => {};

export const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    DATE_PICKER_CONTROL_VALUE_ACCESSOR,
    {
      provide: NgbDateParserFormatter,
      useClass: MyNgbDateParserFormatter
    }
  ]
})
export class DatePickerComponent implements ControlValueAccessor, DoCheck {
  private innerValue: Date = new Date(Date.now());
  private dayObject: {year: number, month: number, day: number};
  private timeObject: {hour: number, minute: number};
  
  private onTouchedCallback: () => void = noop;
  private onChangedCallback: (_: any) => void = noop;
  
  get value(): Date {
    // console.log('in get');
    this.value = new Date(this.dayObject.year, this.dayObject.month -1, this.dayObject.day, this.timeObject.hour, this.timeObject.minute);
    return this.innerValue;
  }
  
  set value(v: Date){
    if(v.getTime() !== this.innerValue.getTime()){
      this.innerValue = v;
      let years = this.innerValue.getFullYear();
      let months = this.innerValue.getMonth() + 1;
      let days = this.innerValue.getDate();
      let hours = this.innerValue.getHours();
      let minutes = this.innerValue.getMinutes();
      this.dayObject = {year: years, month: months, day: days};
      this.timeObject = {hour: hours, minute: minutes};
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
      let hours = this.innerValue.getHours();
      let minutes = this.innerValue.getMinutes();
      this.dayObject = {year: years, month: months, day: days};
      this.timeObject = {hour: hours, minute: minutes};
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
      this.value.setHours(this.timeObject.hour, this.timeObject.minute);
      // console.log('sending onchanged callback');
      // this.onChangedCallback(this.value);
    }
  }

}
