import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';
import { CounterComponent } from './counter/counter.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './navmenu/navmenu.component';

import { appRoutes } from './routes';

import { VehicleService } from './_services/vehicle.service';

@NgModule({
    declarations: [
        AppComponent,
        VehicleFormComponent,
        HomeComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
        NgbModule
    ],
    providers: [VehicleService],
    bootstrap: [AppComponent]
})
export class AppModule {}
