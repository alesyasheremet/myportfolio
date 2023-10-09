// ============================================================================
//    Author: Kenneth Perkins
//    Date:   Dec 22, 2021
//    Taken From: http://programmingnotes.org/
//    File:  positionstack.ts
//    Description: Models for the PositionStack Api
// ============================================================================
import { Utils } from "../utils";
export namespace PositionStack {
    export interface Result {
        data: Location[]
        error: Error
      }
      
      export interface Location {
        ip: string
        network: string
        version: string
        city: string
        region: string
        region_code: string
        country: string
        country_name: string
        country_code: string
        country_code_iso3: string
        country_capital: string
        country_tld: string
        continent_code: string
        in_eu: boolean
        postal: string
        latitude: number
        longitude: number
        timezone: string
        utc_offset: string
        country_calling_code: string
        currency: string
        currency_name: string
        languages: string
        country_area: number
        country_population: number
        asn: string
        org: string
      }
      
      export interface Error {
        code: string
        message: string
      } 

      export function getNearestLocation(latitude: number, longitude: number, locationResults: PositionStack.Result) {
        let nearestDistance = Number.MAX_VALUE;
        let nearestLocation!: PositionStack.Location;
        for (let location of locationResults.data) {
            let distance = Utils.getDistance(latitude, longitude, location.latitude, location.longitude);
            if (distance < nearestDistance) {
                nearestLocation = location;
                nearestDistance = distance;
            }
        }
        return nearestLocation;
    }       
}