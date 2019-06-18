import { ProgressService } from './../_services/progress.service';
import { PhotoService } from './../_services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs/';
import { VehicleService } from '../_services/vehicle.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';

@Component({
    selector: 'app-view-vehicle',
    templateUrl: './view-vehicle.component.html',
    styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
    @ViewChild('memberTabs') memberTabs: TabsetComponent;
    vehicle: any;
    vehicleId: number;
    photos: any[] = [];
    progress: any;
    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(
        private vehicleService: VehicleService,
        private photoService: PhotoService,
        private progressService: ProgressService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.subscribe(p => {
            if (p['id']) this.vehicleId = +p['id'];
            if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
                this.toastr.error('Provide Correct vehicle Info', 'Error');
                this.router.navigate(['/vehicles']);
                return;
            }
        });
    }

    ngOnInit() {
        this.photoService.getPhotos(this.vehicleId).subscribe(p => {
            this.photos = p;
        });
        this.vehicleService.getVehicle(this.vehicleId).subscribe(
            v => {
                this.vehicle = v;
            },
            error => {
                this.toastr.error('Failed to load vehicle', 'Error');
                if (error.status == 404) {
                    this.router.navigate(['/vehicles']);
                    return;
                }
            }
        );
    }

    delete() {
        if (confirm('Are you sure?')) {
            this.vehicleService.delete(this.vehicle.id).subscribe(x => {
                this.toastr.success('Successfully Deleted', 'Delete', {
                    closeButton: true
                });
                this.router.navigate(['/vehicles']);
            });
        }
    }

    uploadPhoto() {
        var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
        var file = nativeElement.files[0];
        nativeElement.value = '';
        if (file && this.isFileFormatSupport(file.name)) {
            this.photoService.startTracking().subscribe(
                progress => {
                    console.log('prog', progress);
                    this.progress = progress;
                },
                null,
                () => {
                    this.progress = null;
                }
            );
            this.photoService.upload(this.vehicleId, file).subscribe(res => {
                console.log('photo', res);
                if (res) {
                    this.photos.push(res);
                }
            });
        }
    }

    deletePhoto(photoId: number) {
        if (confirm('Are you sure?')) {
            this.photoService.deletePhoto(this.vehicleId, photoId).subscribe(
                next => {
                    this.photos.splice(
                        _.findIndex(this.photos, { id: photoId }),
                        1
                    );
                    this.toastr.success('Deleted Successfully', 'Deleted');
                },
                error => {
                    this.toastr.error('Delete the Photo Failed', 'Failed');
                }
            );
        }
    }

    private isFileFormatSupport(fileName: string): boolean {
        var acceptedFileFormats = ['.jpg', '.jpeg', '.png'];
        var ext = fileName.substr(fileName.lastIndexOf('.'), fileName.length);
        console.log('ext', ext);
        if (acceptedFileFormats.includes(ext)) {
            return true;
        }
        this.toastr.error('File format not supported', 'File Format Error');
        return false;
    }
}
