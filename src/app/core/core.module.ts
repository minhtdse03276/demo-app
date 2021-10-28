import { CookieService } from 'ngx-cookie-service';
import { HttpErrorInterceptor } from './server-error.interceptor';
import { GlobalErrorHandler } from './global-error-handler';
import { SharedModule } from './../shared/shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
 declarations: [],
 imports: [
   CommonModule,
   HttpClientModule,
   SharedModule,
   BrowserAnimationsModule,
 ],
 exports: [],
 providers: [
   {provide: ErrorHandler, useClass: GlobalErrorHandler},
   {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
   CookieService
 ]
})
export class CoreModule { }
