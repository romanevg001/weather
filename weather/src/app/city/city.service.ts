import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class CityService {

    constructor(
        private _http: Http,
    ) { }

    
    getPlace(lat,lng){
        var latlng = lat+','+lng;
        let url = '//maps.googleapis.com/maps/api/geocode/json?latlng={latlng}&language=ru'
        .replace("{latlng}", latlng);

        return this._http
            .get(url)
            .map(res => res.json())
            .map(result => {
                if (result.status !== "OK") return null;
                let addresses = [];

                result.results.map((location) => {
                    addresses.push({ location: location.formatted_address, latlng: location.geometry.location });
                });
                return addresses;
            });
    }
}