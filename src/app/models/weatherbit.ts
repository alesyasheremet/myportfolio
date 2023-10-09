// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 22, 2021
//    Taken From: http://programmingnotes.org/
//    File:  weatherbit.ts
//    Description: Models for the WeatherBit api
// ============================================================================
export namespace WeatherBit {   
    export namespace Current {      
        export interface Result {
            data: Forecast
            count: number
        }
        
        export interface Forecast {
            latitude: number
            longitude: number
            generationtime_ms: number
            utc_offset_seconds: number
            timezone: string
            timezone_abbreviation: string
            elevation: number
            daily_units: DailyUnits
            daily: DailyWeather
          }
        
        
    } 
    
    export namespace Daily {      
        export interface Result {
            data: Forecast
            count: number
        }
        
        export interface Forecast {
            latitude: number
            longitude: number
            generationtime_ms: number
            utc_offset_seconds: number
            timezone: string
            timezone_abbreviation: string
            elevation: number
            daily_units: DailyUnits
            daily: DailyWeather
          }
        
    } 

    export interface Forecast {
        latitude: number
        longitude: number
        generationtime_ms: number
        utc_offset_seconds: number
        timezone: string
        timezone_abbreviation: string
        elevation: number
        daily_units: DailyUnits
        daily: DailyWeather
      }
      
      export interface DailyUnits {
        time: string
        temperature_2m_max: string
      }
      
      export interface DailyWeather {
        time: number[]
        temperature_2m_max: number[],
        weathercode: number[]
      }

    export function getForcastImgSrc(icon: string) {
        return `assets/static/img/icons/.png`;
    }    

    export function  getAirQualityDescription(aqi: number) {
        let result = '';
        if (aqi >= 301) {
            result = 'Dangerous';
        } else if (aqi >= 201) {
            result = 'Very Unhealthy';
        } else if (aqi >= 151) {
            result = 'Unhealthy';
        } else if (aqi >= 101) {
            result = 'Poor';
        } else if (aqi >= 51) {
            result = 'Fair';
        } else {
            result = 'Excellent';
        }
        return result;
    }  

    export function getUVIndexDescription(uv: number) {
        let result = '';
        if (uv >= 11) {
            result = 'Extreme';
        } else if (uv >= 8) {
            result = 'Very High';
        } else if (uv >= 6) {
            result = 'High';
        } else if (uv >= 3) {
            result = 'Moderate';
        } else {
            result = 'Low';
        }
        return result;
    }      
}