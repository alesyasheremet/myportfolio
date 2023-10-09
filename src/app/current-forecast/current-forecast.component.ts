// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 22, 2021
//    Taken From: http://programmingnotes.org/
//    File:  current-forecast.component.ts
//    Description: Current forecast typescript
// ============================================================================
import { Component, Input, OnInit } from '@angular/core';
import { WeatherBit } from '../models/weatherbit';
import { Utils } from '../utils'

@Component({
  selector: 'app-current-forecast',
  templateUrl: './current-forecast.component.html',
  styleUrls: ['./current-forecast.component.css']
})
export class CurrentForecastComponent implements OnInit {

    @Input()
    forecast!: WeatherBit.Current.Forecast;

    localDate!: string;
    
    constructor() { }

    ngOnInit(): void {
        console.log(this.forecast.daily.time);
        console.log(this.forecast.daily.temperature_2m_max);
        this.localDate = this.getLocalDateString();
    }

    getForcastImgSrc() {
        return null; //WeatherBit.getForcastImgSrc(this.forecast.daily.temperature_2m_max);
    }

    getTimeOfDay() {
        return null; //this.forecast.pod == 'd' ? 'Day' : 'Night';
    }

    getOutsideDescription() {
        return null; //this.forecast.weather.description;
    }

    getLocalDateString() {
        let date = this.toLocalDatetime(new Date());
        return `${Utils.getWeekdayName(date)} ${Utils.getDateTimeString(date)}`;
    }

    getLocalSunrise() {
        /*
        let split = this.forecast.sunrise.split(':');
        let date = new Date();
        date.setHours(Number(split[0]));
        date.setMinutes(Number(split[1]));*/
        return null; //Utils.getTimeString(this.toLocalDatetime(Utils.treatAsUTC(date)));
    }

    getLocalSunset() {
        /*let split = this.forecast.sunset.split(':');
        let date = new Date();
        date.setHours(Number(split[0]));
        date.setMinutes(Number(split[1]));        
        return Utils.getTimeString(this.toLocalDatetime(Utils.treatAsUTC(date)));*/
        return '';
    }

    getLastUpdated() {
        /*let date = new Date(this.forecast.ob_time);
        return Utils.getTimeString(this.toLocalDatetime(Utils.treatAsUTC(date)));*/
        return '';
    }

    toLocalDatetime(date: Date) {
        return Utils.convertTimezone(date, this.forecast.timezone);
    }

    getAirQualityDescription() {
        return ''; //WeatherBit.getAirQualityDescription(this.forecast.aqi);
    }

    getAirQualityCss() {
        /*
        let desc = this.getAirQualityDescription();
        let className = desc.replace(' ', '-').toLowerCase();
        return `air-quality ${className}`;*/
        return '';
    } 
    
    getUVIndexDescription() {
        return ''; //WeatherBit.getUVIndexDescription(this.forecast.uv);
    }

    getUVIndexCss() {
        /*
        let desc = this.getUVIndexDescription();
        let className = desc.replace(' ', '-').toLowerCase();
        return `uv-index ${className}`;*/
        return '';
    }    
}