import { SaveVehicle, KeyValuePair, Vehicle } from './../_models/vehicle';
import { Model } from './../_models/model';
import { Make } from './../_models/make';
import { VehicleService } from '../_services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as _ from 'underscore';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    makes: Make[] = [];
    models: Model[] = [];
    vehicle: SaveVehicle = {
        id: 0,
        modelId: 0,
        makeId: 0,
        isRegistered: false,
        features: [],
        contact: {
            name: '',
            email: '',
            phone: ''
        }
    };
    features: KeyValuePair[] = [];

    constructor(
        private vehicleService: VehicleService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.subscribe(p => {
            if (p['id']) this.vehicle.id = +p['id'] || 0;
        });
    }

    ngOnInit() {
        var sources: any[] = [
            this.vehicleService.getFeatures(),
            this.vehicleService.getMakes()
        ];
        if (this.vehicle.id)
            sources.push(this.vehicleService.getVehicle(this.vehicle.id));
        forkJoin(sources).subscribe(
            data => {
                this.makes = data[1];
                this.features = data[0];
                if (this.vehicle.id) {
                    this.setVehicle(data[2]);
                }
            },
            error => {
                if (error.status == 404) this.router.navigate(['/home']);
            }
        );
    }

    private setVehicle(v: Vehicle) {
        this.vehicle.id = v.id;
        this.vehicle.makeId = v.make.id;
        this.populateModels();
        this.vehicle.modelId = v.model.id;
        this.vehicle.contact = v.contact;
        this.vehicle.isRegistered = v.isRegistered;
        // this.vehicle.features = v.features.map(f => f.id); works
        this.vehicle.features = _.pluck(v.features, 'id');
    }

    onMakeChange() {
        this.populateModels();
        delete this.vehicle.modelId;
    }
    private populateModels() {
        let selectedMake = this.makes.find(d => d.id == this.vehicle.makeId);
        this.models = selectedMake ? selectedMake.models : [];
    }

    onFeatureToggle(featureId, $event) {
        if ($event.target.checked) {
            this.vehicle.features.push(featureId);
        } else {
            var index = this.vehicle.features.indexOf(featureId);
            this.vehicle.features.splice(index, 1);
        }
    }

    submit() {
        var result$ = this.vehicle.id
            ? this.vehicleService.update(this.vehicle)
            : this.vehicleService.create(this.vehicle);
        result$.subscribe(vehicle => {
            this.toastr.success(
                'The vehicle has successfully saved',
                'Success',
                {
                    closeButton: true
                }
            );
            this.router.navigate(['/vehicles/', vehicle.id]);
        });
        // if (this.vehicle.id) {
        //     this.vehicleService.update(this.vehicle).subscribe(x => {
        //         this.toastr.success(
        //             'The vehicle has successfully updated',
        //             'Updated',
        //             {
        //                 closeButton: true
        //             }
        //         );
        //         this.router.navigate(['/vehicles']);
        //     });
        // } else {
        //     this.vehicleService.create(this.vehicle).subscribe(x => {
        //         console.log(x);
        //         this.toastr.success('Successfully Created', 'Created', {
        //             closeButton: true
        //         });
        //         this.router.navigate(['/vehicles']);
        //     });
        // }
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
}
