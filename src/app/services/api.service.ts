// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 22, 2021
//    Taken From: http://programmingnotes.org/
//    File:  api.service.ts
//    Description: Services that allow Api interaction
// ============================================================================
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { RuntimeError } from '../models/errors';
import { ForecastLocationSearch } from '../models/forecastlocationsearch';
import { PositionStack } from '../models/positionstack';
import { WeatherBit } from '../models/weatherbit';

@Injectable({
  providedIn: 'root'
})
export class ApiService {    
    baseUrl = '';
    key = 'de63ee9cbd104ced836c780bfb2676c0';

    constructor(protected http: HttpClient) { }   

    hasKey() {
        return this.key.length > 0;
    }    
}

@Injectable({
    providedIn: 'root'
})
export class WeatherBitApiService extends ApiService {
    override baseUrl = 'https://api.open-meteo.com/v1/forecast';
    override key = 'de63ee9cbd104ced836c780bfb2676c0';

    getCurrentForecast(latitude: number, longitude: number, timezone: string) {
        let url = `${this.baseUrl}?forecast_days=8&latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weathercode&timeformat=unixtime&format=json&timezone=${timezone}`; 
        // console.log(url);
        return this.http.get<WeatherBit.Current.Result>(url);           
    }  
    getDailyForecast(latitude: number, longitude: number, timezone: string) {
        let url = `${this.baseUrl}?forecast_days=8&latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,weathercode&timeformat=unixtime&format=json&timezone=${timezone}`;
        // console.log(url);
        return this.http.get<WeatherBit.Daily.Result>(url);           
    } 
    async getForecast(latitude: number, longitude: number, timezone: string) {
        // Get current forecast
        let current = await firstValueFrom(this.getCurrentForecast(latitude, longitude, timezone));
        // console.log(current);
        if (current == null) {
            throw new RuntimeError.ForecastError(`No current forecast results returned for latitude: ${latitude}, longitude: ${longitude}`);
        }

        // Get daily forecast
        let daily = await firstValueFrom(this.getDailyForecast(latitude, longitude, timezone));

        return {
            current: current,
            daily: daily.data
        };
    }              
}

@Injectable({
    providedIn: 'root'
})
export class PositionStackApiService extends ApiService {
    override baseUrl = 'https://ipapi.co/json';
    override key = '60b7db72c3b0554f537a3e454c79411f';

    getForwardSearch(search: string) {
        //&limit=1
        let url = `${this.baseUrl}/forward?access_key=${this.key}&query=${encodeURIComponent(search)}`; 
        // console.log(url);
        return this.http.get<PositionStack.Result>(url);           
    }

    getReverseSearch(ipAddress: string): any;
    getReverseSearch(latitude: number, longitude: number): any;   
    getReverseSearch(param1: string | number, param2?: string | number): any {
        let search = '';
        if (param2 == null) {
            search = `${param1}`;
        } else {
            search = `${param1},${param2}`;
        }
        let url = `${this.baseUrl}`; 
        // console.log(url);
        return this.http.get<PositionStack.Result>(url);           
    }  

    async getForecastLocation(type: ForecastLocationSearch.Type, options: ForecastLocationSearch.Options) {
        let observable!: Observable<PositionStack.Result>;
        switch(type) {
            case ForecastLocationSearch.Type.IP:
                observable = this.getReverseSearch(options.ipAddress || '');
                break;
            case ForecastLocationSearch.Type.SearchQuery:
                observable = this.getForwardSearch(options.searchQuery || '');              
                break;
            case ForecastLocationSearch.Type.GPS:
                observable = this.getReverseSearch(options.latitude || 0, options.longitude || 0);
                break;
            default:
                throw new Error(`Unknown search type: ${type}`);
                break;
        }
        let geocode = await firstValueFrom(observable);
        // console.log(geocode);
        if (geocode.error != null) {
            throw new RuntimeError.ForecastLocationError(geocode.error.message, type);
        }  else if (!geocode.data || geocode.data.length == 0) {
            throw new RuntimeError.ForecastLocationError('No forecast location results returned', type);
        }
        return geocode;
    }        
}