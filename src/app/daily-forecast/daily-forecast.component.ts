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
    forecast!: [number, number, number];

    @Input()
    timezone!: string;
    
    forecastDateString!: string;
    forecastTemp!: number;
    forecastDescrCode!: Day;

    wmocodesjson = "{\"0\":{\"day\":{\"description\":\"Sunny\",\"image\":\"http://openweathermap.org/img/wn/01d@2x.png\"},\"night\":{\"description\":\"Clear\",\"image\":\"http://openweathermap.org/img/wn/01n@2x.png\"}},\"1\":{\"day\":{\"description\":\"MainlySunny\",\"image\":\"http://openweathermap.org/img/wn/01d@2x.png\"},\"night\":{\"description\":\"MainlyClear\",\"image\":\"http://openweathermap.org/img/wn/01n@2x.png\"}},\"2\":{\"day\":{\"description\":\"PartlyCloudy\",\"image\":\"http://openweathermap.org/img/wn/02d@2x.png\"},\"night\":{\"description\":\"PartlyCloudy\",\"image\":\"http://openweathermap.org/img/wn/02n@2x.png\"}},\"3\":{\"day\":{\"description\":\"Cloudy\",\"image\":\"http://openweathermap.org/img/wn/03d@2x.png\"},\"night\":{\"description\":\"Cloudy\",\"image\":\"http://openweathermap.org/img/wn/03n@2x.png\"}},\"45\":{\"day\":{\"description\":\"Foggy\",\"image\":\"http://openweathermap.org/img/wn/50d@2x.png\"},\"night\":{\"description\":\"Foggy\",\"image\":\"http://openweathermap.org/img/wn/50n@2x.png\"}},\"48\":{\"day\":{\"description\":\"RimeFog\",\"image\":\"http://openweathermap.org/img/wn/50d@2x.png\"},\"night\":{\"description\":\"RimeFog\",\"image\":\"http://openweathermap.org/img/wn/50n@2x.png\"}},\"51\":{\"day\":{\"description\":\"LightDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"LightDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"53\":{\"day\":{\"description\":\"Drizzle\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"Drizzle\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"55\":{\"day\":{\"description\":\"HeavyDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"HeavyDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"56\":{\"day\":{\"description\":\"LightFreezingDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"LightFreezingDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"57\":{\"day\":{\"description\":\"FreezingDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"FreezingDrizzle\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"61\":{\"day\":{\"description\":\"LightRain\",\"image\":\"http://openweathermap.org/img/wn/10d@2x.png\"},\"night\":{\"description\":\"LightRain\",\"image\":\"http://openweathermap.org/img/wn/10n@2x.png\"}},\"63\":{\"day\":{\"description\":\"Rain\",\"image\":\"http://openweathermap.org/img/wn/10d@2x.png\"},\"night\":{\"description\":\"Rain\",\"image\":\"http://openweathermap.org/img/wn/10n@2x.png\"}},\"65\":{\"day\":{\"description\":\"HeavyRain\",\"image\":\"http://openweathermap.org/img/wn/10d@2x.png\"},\"night\":{\"description\":\"HeavyRain\",\"image\":\"http://openweathermap.org/img/wn/10n@2x.png\"}},\"66\":{\"day\":{\"description\":\"LightFreezingRain\",\"image\":\"http://openweathermap.org/img/wn/10d@2x.png\"},\"night\":{\"description\":\"LightFreezingRain\",\"image\":\"http://openweathermap.org/img/wn/10n@2x.png\"}},\"67\":{\"day\":{\"description\":\"FreezingRain\",\"image\":\"http://openweathermap.org/img/wn/10d@2x.png\"},\"night\":{\"description\":\"FreezingRain\",\"image\":\"http://openweathermap.org/img/wn/10n@2x.png\"}},\"71\":{\"day\":{\"description\":\"LightSnow\",\"image\":\"http://openweathermap.org/img/wn/13d@2x.png\"},\"night\":{\"description\":\"LightSnow\",\"image\":\"http://openweathermap.org/img/wn/13n@2x.png\"}},\"73\":{\"day\":{\"description\":\"Snow\",\"image\":\"http://openweathermap.org/img/wn/13d@2x.png\"},\"night\":{\"description\":\"Snow\",\"image\":\"http://openweathermap.org/img/wn/13n@2x.png\"}},\"75\":{\"day\":{\"description\":\"HeavySnow\",\"image\":\"http://openweathermap.org/img/wn/13d@2x.png\"},\"night\":{\"description\":\"HeavySnow\",\"image\":\"http://openweathermap.org/img/wn/13n@2x.png\"}},\"77\":{\"day\":{\"description\":\"SnowGrains\",\"image\":\"http://openweathermap.org/img/wn/13d@2x.png\"},\"night\":{\"description\":\"SnowGrains\",\"image\":\"http://openweathermap.org/img/wn/13n@2x.png\"}},\"80\":{\"day\":{\"description\":\"LightShowers\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"LightShowers\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"81\":{\"day\":{\"description\":\"Showers\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"Showers\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"82\":{\"day\":{\"description\":\"HeavyShowers\",\"image\":\"http://openweathermap.org/img/wn/09d@2x.png\"},\"night\":{\"description\":\"HeavyShowers\",\"image\":\"http://openweathermap.org/img/wn/09n@2x.png\"}},\"85\":{\"day\":{\"description\":\"LightSnowShowers\",\"image\":\"http://openweathermap.org/img/wn/13d@2x.png\"},\"night\":{\"description\":\"LightSnowShowers\",\"image\":\"http://openweathermap.org/img/wn/13n@2x.png\"}},\"86\":{\"day\":{\"description\":\"SnowShowers\",\"image\":\"http://openweathermap.org/img/wn/13d@2x.png\"},\"night\":{\"description\":\"SnowShowers\",\"image\":\"http://openweathermap.org/img/wn/13n@2x.png\"}},\"95\":{\"day\":{\"description\":\"Thunderstorm\",\"image\":\"http://openweathermap.org/img/wn/11d@2x.png\"},\"night\":{\"description\":\"Thunderstorm\",\"image\":\"http://openweathermap.org/img/wn/11n@2x.png\"}},\"96\":{\"day\":{\"description\":\"LightThunderstormsWithHail\",\"image\":\"http://openweathermap.org/img/wn/11d@2x.png\"},\"night\":{\"description\":\"LightThunderstormsWithHail\",\"image\":\"http://openweathermap.org/img/wn/11n@2x.png\"}},\"99\":{\"day\":{\"description\":\"ThunderstormWithHail\",\"image\":\"http://openweathermap.org/img/wn/11d@2x.png\"},\"night\":{\"description\":\"ThunderstormWithHail\",\"image\":\"http://openweathermap.org/img/wn/11n@2x.png\"}}}";

    constructor() { }

    ngOnInit(): void {
        this.forecastDateString = this.getForcastDateString();
        this.forecastTemp = this.getForecastTemp();
        this.forecastDescrCode = this.getForecastWeathercode();
    }

    getForcastDateString() {
        let localDate = this.toLocalDatetime(new Date(this.forecast[0] * 1000));
        
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
        this.getForecastWeathercode();
        return this.forecast[1];
    }


    getForecastWeathercode() {
    
        var wmo = <WmoCodes>JSON.parse(this.wmocodesjson);
        switch(this.forecast[2]){
            case 0:
                return wmo[0].day;
                break;
            case 1:
                return wmo[1].day;
                break;
            case 2:
                return wmo[2].day;
                break;
            case 3:
                return wmo[3].day;
                break;
            case 45:
                return wmo[45].day;
                break;
            case 48:
                return wmo[48].day;
                break;    
            case 51:
                return wmo[51].day;
                break;    
            case 53:
                    return wmo[53].day;
                    break;
            case 55:
                    return wmo[55].day;
                    break;
            case 56:
                    return wmo[56].day;
                    break;
            case 57:
                    return wmo[57].day;
                    break;
            case 61:
                    return wmo[61].day;
                    break;
                case 63:
                    return wmo[63].day;
                    break;    
                case 65:
                    return wmo[65].day;
                    break;  
                    case 66:
                        return wmo[66].day;
                        break;  
                        case 67:
                            return wmo[67].day;
                            break;  
                            case 71:
                                return wmo[71].day;
                                break;    
                            case 73:
                                return wmo[73].day;
                                break;  
                                case 75:
                                    return wmo[75].day;
                                    break;  
                                    case 77:
                                        return wmo[77].day;
                                        break;  
                                        case 80:
                                            return wmo[80].day;
                                            break;    
                                        case 81:
                                            return wmo[81].day;
                                            break;  
                                            case 82:
                                                return wmo[82].day;
                                                break;  
                                                case 85:
                                                    return wmo[85].day;
                                                    break;  
                                                    case 86:
                                                        return wmo[86].day;
                                                        break;  
                                                        case 95:
                                                            return wmo[95].day;
                                                            break;  
                                                            case 96:
                                                                return wmo[96].day;
                                                                break;    
                                                            case 99:
                                                                return wmo[99].day;
                                                                break;  
                                                                
            default:
                throw new Error(`Unknown wmo code: ${this.forecast[2]}`);
                break;
    }
    }



    getForcastImgSrc() {
        return ""; //WeatherBit.getForcastImgSrc(this.forecast.weather.icon);
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

export interface WmoCodes {
    0: DayTime,
    1: DayTime
    2: DayTime
    3: DayTime
    45: DayTime
    48: DayTime
    51: DayTime
    53: DayTime
    55: DayTime
    56: DayTime
    57: DayTime
    61: DayTime
    63: DayTime
    65: DayTime
    66: DayTime
    67: DayTime
    71: DayTime
    73: DayTime
    75: DayTime
    77: DayTime
    80: DayTime
    81: DayTime
    82: DayTime
    85: DayTime
    86: DayTime
    95: DayTime
    96: DayTime
    99: DayTime
  }
  
  export interface DayTime {
    day: Day
    night: Night
  }
  
  export interface Day {
    description: string
    image: string
  }
  
  export interface Night {
    description: string
    image: string
  }