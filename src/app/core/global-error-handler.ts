import { ErrorService } from './errors/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private injector: Injector
  ) {
  }

  async handleError(error: HttpErrorResponse): Promise<void> {
    console.warn('[GLOBAL ERROR HANDLE] >>>>>>>>>>>>>>>>>>>>>>>');
    const errorService = this.injector.get(ErrorService);

    if (errorService.isNotFoundUrl(error)) {
      await errorService.handlePageNotFound();
    } else if (error instanceof HttpErrorResponse) {
      errorService.handleApiFail(error);
    } else {
      errorService.handleCommonCodeError(error);
    }

    console.error(error);
    console.warn('[GLOBAL ERROR HANDLE] >>>>>>>>>>>>>>>>>>>>>>>');
  }
}
