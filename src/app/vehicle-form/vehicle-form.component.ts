import { Feature } from './../_models/feature';
import { Model } from './../_models/model';
import { Make } from './../_models/make';
import { VehicleService } from '../_services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
    makes: Make[] = [];
    models: Model[] = [];
    vehicle: any = {
        features: [],
        contact: {}
    };
    features: Feature[] = [];

    constructor(private vehicleService: VehicleService) {}

    ngOnInit() {
        this.vehicleService.getMakes().subscribe(makes => {
            this.makes = makes;
        });
        this.vehicleService.getFeatures().subscribe(features => {
            this.features = features;
        });
    }

    onMakeChange() {
        let selectedMake = this.makes.find(d => d.id == this.vehicle.makeId);
        this.models = selectedMake ? selectedMake.models : [];
        delete this.vehicle.modelId;
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
        this.vehicleService.create(this.vehicle).subscribe(x => console.log(x));
    }
}
