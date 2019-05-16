import { Feature } from '../_models/feature';
import { Make } from '../_models/make';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleService {
    baseUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getMakes(): Observable<Make[]> {
        return this.http.get<Make[]>(this.baseUrl + 'makes');
    }

    getFeatures(): Observable<Feature[]> {
        return this.http.get<Feature[]>(this.baseUrl + 'features');
    }

    create(vehicle) {
        return this.http.post<any>(this.baseUrl + 'vehicles', vehicle);
    }
}
