import { Make } from './../_models/make';
import { VehicleService } from './../_services/vehicle.service';
import { Vehicle } from './../_models/vehicle';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
    private readonly PAGE_SIZE = 2;
    vehicles: Vehicle[] = [];
    allVehicles: Vehicle[] = [];
    makes: Make[] = [];
    query: any = {
        pageSize: this.PAGE_SIZE
    };
    columns = [
        { title: 'Id', key: 'id', isSortable: true },
        { title: 'Make', key: 'make', isSortable: true },
        { title: 'Model', key: 'model', isSortable: true },
        { title: 'Contact Name', key: 'contactName', isSortable: true }
    ];

    constructor(private vehicleService: VehicleService) {}

    ngOnInit() {
        this.vehicleService.getMakes().subscribe(m => {
            this.makes = m;
        });
        this.populateVehicles();
    }

    onFilterChange() {
        this.query.page = 1;
        this.populateVehicles();
    }

    reset() {
        this.query = {
            page: 1,
            pageSize: this.PAGE_SIZE
        };
        this.populateVehicles();
    }

    populateVehicles() {
        this.vehicleService.getVehicles(this.query).subscribe(result => {
            this.vehicles = result.items;
            this.query.totalItems = result.totalItems;
        });
    }

    sortBy(columnName: string) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }
        this.populateVehicles();
    }

    onPageChange(page) {
        this.query.page = page;
        this.populateVehicles();
    }
}
