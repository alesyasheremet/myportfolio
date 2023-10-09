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
            coord: Coord
            weather: Weather[]
            base: string
            main: Main
            visibility: number
            wind: Wind
            clouds: Clouds
            dt: number
            sys: Sys
            timezone: number
            id: number
            name: string
            cod: number
          }
          
          export interface Coord {
            lon: number
            lat: number
          }
          
          export interface Weather {
            id: number
            main: string
            description: string
            icon: string
          }
          
          export interface Main {
            temp: number
            feels_like: number
            temp_min: number
            temp_max: number
            pressure: number
            humidity: number
          }
          
          export interface Wind {
            speed: number
            deg: number
          }
          
          export interface Clouds {
            all: number
          }
          
          export interface Sys {
            type: number
            id: number
            country: string
            sunrise: number
            sunset: number
          }




        export interface Result2 {
            data: Forecast[]
            count: number,
        }

        export interface Forecast {
            coord: Coord,
            rh: number
            pod: string
            lon: number
            pres: number
            timezone: string
            ob_time: string
            country_code: string
            clouds: number
            ts: number
            solar_rad: number
            state_code: string
            city_name: string
            wind_spd: number
            wind_cdir_full: string
            wind_cdir: string
            slp: number
            vis: number
            h_angle: number
            sunset: string
            dni: number
            dewpt: number
            snow: number
            uv: number
            precip: number
            wind_dir: number
            sunrise: string
            ghi: number
            dhi: number
            aqi: number
            lat: number
            weather: Weather
            datetime: string
            temp: number
            station: string
            elev_angle: number
            app_temp: number
        }
        
    } 
    
    export namespace Daily {
        export interface Result {
            data: Forecast[]
            city_name: string
            lon: number
            timezone: string
            lat: number
            country_code: string
            state_code: string
        }
        
        export interface Forecast {
            moonrise_ts: number
            wind_cdir: string
            rh: number
            pres: number
            high_temp: number
            sunset_ts: number
            ozone: number
            moon_phase: number
            wind_gust_spd: number
            snow_depth: number
            clouds: number
            ts: number
            sunrise_ts: number
            app_min_temp: number
            wind_spd: number
            pop: number
            wind_cdir_full: string
            slp: number
            moon_phase_lunation: number
            valid_date: string
            app_max_temp: number
            vis: number
            dewpt: number
            snow: number
            uv: number
            weather: Weather
            wind_dir: number
            max_dhi: any
            clouds_hi: number
            precip: number
            low_temp: number
            max_temp: number
            moonset_ts: number
            datetime: string
            temp: number
            min_temp: number
            clouds_mid: number
            clouds_low: number
        }
    }

    export interface Weather {
        icon: string
        code: number
        description: string
    }

    export function getForcastImgSrc(icon: string) {
        return `https://www.weatherbit.io/static/img/icons/${icon}.png`;
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