import { AuthService } from './auth.service';
import {
    KeyValuePair,
    Vehicle,
    SaveVehicle,
    QueryResult
} from './../_models/vehicle';
import { Feature } from '../_models/feature';
import { Make } from '../_models/make';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    baseUrl: string = environment.apiUrl;
    constructor(private http: HttpClient, private auth: AuthService) {}

    getMakes(): Observable<Make[]> {
        return this.http.get<Make[]>(this.baseUrl + 'makes');
    }

    getFeatures(): Observable<Feature[]> {
        return this.http.get<KeyValuePair[]>(this.baseUrl + 'features');
    }

    create(vehicle) {
        return this.http.post<any>(
            this.baseUrl + 'vehicles',
            vehicle,
            this.jwt()
        );
    }

    update(saveVehicle: SaveVehicle) {
        return this.http.put<any>(
            this.baseUrl + 'vehicles/' + saveVehicle.id,
            saveVehicle
        );
    }

    delete(id) {
        return this.http.delete(this.baseUrl + 'vehicles/' + id);
    }

    getVehicle(id) {
        return this.http.get<Vehicle>(this.baseUrl + 'vehicles/' + id);
    }

    getVehicles(filter) {
        return this.http.get<QueryResult<Vehicle>>(
            this.baseUrl + 'vehicles?' + this.toQueryString(filter)
        );
    }

    toQueryString(obj) {
        var parts = [];
        for (var property in obj) {
            var value = obj[property];
            if (value != null && value != undefined)
                parts.push(
                    encodeURIComponent(property) +
                        '=' +
                        encodeURIComponent(value)
                );
        }
        return parts.join('&');
    }

    jwt() {
        let token = this.auth.accessToken;
        if (token) {
            const headers = new HttpHeaders({
                'Content-type': 'application/json',
                Authorization: 'Bearer ' + token
            });
            return { headers: headers };
        }
    }
}
