import { CallbackComponent } from './callback/callback.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
    { path: 'vehicles/new', component: VehicleFormComponent },
    { path: 'vehicles/edit/:id', component: VehicleFormComponent },
    { path: 'vehicles/:id', component: ViewVehicleComponent },
    { path: 'vehicles', component: VehicleListComponent },
    { path: 'callback', component: CallbackComponent },
    { path: 'home', component: HomeComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
    { path: '**', redirectTo: 'home' }
];
