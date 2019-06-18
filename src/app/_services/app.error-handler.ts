import { ErrorHandler, Inject, NgZone, isDevMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Sentry from '@sentry/browser';
import { throwError } from 'rxjs';

export class AppErrorHandler implements ErrorHandler {
    constructor(
        @Inject(ToastrService) private toastr: ToastrService,
        private ngZone: NgZone
    ) {}
    handleError(error: any): void {
        this.ngZone.run(() => {
            this.toastr.error('An unexpected error occured!', 'Error', {
                closeButton: true
            });
        });
        if (!isDevMode()) Sentry.captureException(error.originalError || error);
        else throwError(error);
        // Sentry.showReportDialog({ eventId });
    }
}

export const AppErrorHandlerProvider = {
    provide: ErrorHandler,
    useClass: AppErrorHandler
};
