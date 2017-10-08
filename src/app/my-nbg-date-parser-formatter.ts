import {NgbDateParserFormatter, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Injectable} from "@angular/core";

@Injectable()
export class MyNgbDateParserFormatter extends NgbDateParserFormatter {
  format(date: NgbDateStruct): string {
    let toReturn = '';
    
    if(!date){
      return toReturn;
    }
    
    if(date.month === 1){
      toReturn += 'Jan';
    }
    else if(date.month === 2){
      toReturn += 'Feb';
    }
    else if(date.month === 3){
      toReturn += 'Mar';
    }
    else if(date.month === 4){
      toReturn += 'Apr';
    }
    else if(date.month === 5){
      toReturn += 'May';
    }
    else if(date.month === 6){
      toReturn += 'Jun';
    }
    else if(date.month === 7){
      toReturn += 'Jul';
    }
    else if(date.month === 8){
      toReturn += 'Aug';
    }
    else if(date.month === 9){
      toReturn += 'Sep';
    }
    else if(date.month === 10){
      toReturn += 'Oct';
    }
    else if(date.month === 11){
      toReturn += 'Nov';
    }
    else if(date.month === 12){
      toReturn += 'Dec';
    }
    
    toReturn += ' ' + date.day + ', ' + date.year;
    
    return toReturn;
  }
  
  parse(value: string): NgbDateStruct {
    let toReturn: NgbDateStruct = {year: 0, month: 1, day: 1};
    
    if(value.includes('Jan')){
      toReturn.month = 1;
    }
    else if(value.includes('Feb')){
      toReturn.month = 2;
    }
    else if(value.includes('Mar')){
      toReturn.month = 3;
    }
    else if(value.includes('Apr')){
      toReturn.month = 4;
    }
    else if(value.includes('May')){
      toReturn.month = 5;
    }
    else if(value.includes('Jun')){
      toReturn.month = 6;
    }
    else if(value.includes('Jul')){
      toReturn.month = 7;
    }
    else if(value.includes('Aug')){
      toReturn.month = 8;
    }
    else if(value.includes('Sep')){
      toReturn.month = 9;
    }
    else if(value.includes('Oct')){
      toReturn.month = 10;
    }
    else if(value.includes('Nov')){
      toReturn.month = 11;
    }
    else if(value.includes('Dec')){
      toReturn.month = 12;
    }
    
    let days = parseInt(value.slice(value.indexOf(' ' + 1, value.indexOf(',') - value.indexOf(' '))));
    toReturn.day = days;
    
    let years = parseInt(value.slice(value.indexOf(',') + 1));
    toReturn.year = years;
    
    return toReturn;
  }
}
