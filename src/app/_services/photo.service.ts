import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PhotoService {
    baseUrl: string = environment.apiUrl + 'vehicles/';
    private uploadProgress: Subject<any>;

    constructor(private http: HttpClient) {}

    startTracking() {
        this.uploadProgress = new Subject();
        return this.uploadProgress;
    }

    upload(vehicleId, photoFile) {
        var formData = new FormData();
        formData.append('photoFile', photoFile);
        return this.http
            .post(`${this.baseUrl}${vehicleId}/photos`, formData, {
                reportProgress: true,
                observe: 'events'
            })
            .pipe(
                map(event => {
                    return this.getEventMessage(event, formData);
                })
            );
    }

    private getEventMessage(event: HttpEvent<any>, formData) {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                this.fileUploadProgress(event);
                return;

            case HttpEventType.Response:
                return this.apiResponse(event);

            default:
                console.log(
                    `File "${
                        formData.get('photoFile').name
                    }" surprising upload event: ${event.type}.`
                );
                return;
        }
    }
    private fileUploadProgress(event) {
        console.log('fileUploadProgress', event);
        const percentDone = Math.round((100 * event.loaded) / event.total);
        this.uploadProgress.next({ status: 'progress', message: percentDone });
    }

    private apiResponse(event) {
        console.log('apiResponse', event);
        console.log('Before', this.uploadProgress);
        this.uploadProgress.complete();
        console.log('After', this.uploadProgress);
        return event.body;
    }

    getPhotos(vehicleId) {
        return this.http.get<any[]>(`${this.baseUrl}${vehicleId}/photos`);
    }

    deletePhoto(vehicleId, photoId) {
        return this.http.delete(
            `${this.baseUrl}${vehicleId}/photos/${photoId}`
        );
    }
}
