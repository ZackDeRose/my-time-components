import {
  Component, DoCheck, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable} from "rxjs";

const noop = () => {};

export const TIME_PICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TimePickerComponent),
  multi: true
};

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: [
    './time-picker.component.css',
  ],
  providers: [TIME_PICKER_CONTROL_VALUE_ACCESSOR]
})
export class TimePickerComponent implements ControlValueAccessor, DoCheck {
  private innerValue: number = 0;
  private timeObject: {hour: number, minute: number};
  @Input() disabled: boolean;

  private onTouchedCallback: () => void = noop;
  private onChangedCallback: (_: any) => void = noop;

  // timeObjectObservable: Observable<any>;

  constructor(){
    // let hours = Math.floor(this.innerValue / 1000 / 60 / 60);
    // let minutes = Math.floor((this.innerValue - hours * 1000 * 60 * 60) / 1000 / 60);
    // this.timeObject = {hour: hours, minute: minutes};
  }

  get value(): number {
    return this.innerValue;
  }

  set value(v: number){
    if(v !== this.innerValue){
      this.innerValue = v;
      let hours = Math.floor(this.innerValue / 1000 / 60 / 60);
      let minutes = Math.floor((this.innerValue - hours * 1000 * 60 * 60) / 1000 / 60);
      this.timeObject = {hour: hours, minute: minutes};
      this.onChangedCallback(v);
    }
  }

  writeValue(value: number){
    if(value !== this.innerValue){
      this.innerValue = value;
      let hours = Math.floor(this.innerValue / 1000 / 60 / 60);
      let minutes = Math.floor((this.innerValue - hours * 1000 * 60 * 60) / 1000 / 60);
      this.timeObject = {hour: hours, minute: minutes};
    }
  }

  registerOnChange(fn: (_: any) => void): void{
    this.onChangedCallback = fn;
  }

  registerOnTouched(fn: any){
    this.onTouchedCallback = fn;
  }

  ngDoCheck(){
    if(this.timeObject) {
      this.value = this.timeObject.hour * 1000 * 60 * 60 + this.timeObject.minute * 1000 * 60;
    }
  }
}
