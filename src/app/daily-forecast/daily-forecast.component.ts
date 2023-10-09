// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 22, 2021
//    Taken From: http://programmingnotes.org/
//    File:  daily-forecast.component.ts
//    Description: Daily forecast typescript
// ============================================================================
import { Component, Input, OnInit } from '@angular/core';
import { WeatherBit } from '../models/weatherbit';
import { Utils } from '../utils';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.css']
})
export class DailyForecastComponent implements OnInit {

    @Input()
    forecast!: [number, number];

    @Input()
    timezone!: string;
    
    forecastDateString!: string;
    forecastTemp!: number;
    constructor() { }

    ngOnInit(): void {
        this.forecastDateString = this.getForcastDateString();
        this.forecastTemp = this.getForecastTemp();
    }

    getForcastDateString() {
        let localDate = this.toLocalDatetime(new Date(this.forecast[0] * 1000));
        console.log(new Date(this.forecast[0] * 1000));
        //let parts = this.forecast.valid_date.split('-');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        //let date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));         

        /*
        if (date.getMonth() == localDate.getMonth() 
            && date.getDate() == localDate.getDate() 
            && date.getFullYear() == localDate.getFullYear()) {
            return 'Today';
        }

        return date.toLocaleString('default', {
            month: 'short',
            day  : '2-digit',
            weekday: 'short',
            timeZone: 'UTC',
        });   */  
        return localDate.toLocaleString('default', {
            month: 'short',
            day  : '2-digit',
            weekday: 'short',
            timeZone: 'UTC',
        });  
    }


    getForecastTemp() {
        return this.forecast[1];
    }

    getForcastImgSrc() {
        return null; //WeatherBit.getForcastImgSrc(this.forecast.weather.icon);
    }
    
    getUVIndexDescription() {
        return null; //WeatherBit.getUVIndexDescription(this.forecast.uv);
    }

    getUVIndexCss() {
        let desc = this.getUVIndexDescription();
        let className = null;// desc.replace(' ', '-').toLowerCase();
        return `uv-index ${className}`;
    }    
    
    toLocalDatetime(date: Date) {
        return Utils.convertTimezone(date, this.timezone);
    }    
}
