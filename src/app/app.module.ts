import { AuthService } from './_services/auth.service';
import { PhotoService } from './_services/photo.service';
import { AppErrorHandlerProvider } from './_services/app.error-handler';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import { ToastrModule } from 'ngx-toastr';
import * as Sentry from '@sentry/browser';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { PaginationComponent } from './_shared/pagination.component';
import { ViewVehicleComponent } from './view-vehicle/view-vehicle.component';
import { ProgressService } from './_services/progress.service';
import { CallbackComponent } from './callback/callback.component';

Sentry.init({
    dsn: 'https://7e1a2e50b8a64e568f7961b4b2516e40@sentry.io/1461728'
});

@NgModule({
    declarations: [
        AppComponent,
        VehicleFormComponent,
        HomeComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        CallbackComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        FormsModule,
        NgbModule,
        ToastrModule.forRoot({
            timeOut: 4000,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        TabsModule.forRoot(),
        ProgressbarModule.forRoot()
    ],
    providers: [
        VehicleService,
        PhotoService,
        ProgressService,
        AppErrorHandlerProvider,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
