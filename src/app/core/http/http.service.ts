import { HttpBackend, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs';

export const HTTP_INTERCEPTORS_CUSTOM = new InjectionToken<HttpInterceptor[]>('HTTP_INTERCEPTORS_CUSTOM');

/**
 * `HttpHandler` which applies an `HttpInterceptor` to an `HttpRequest`.
 */
export class MyHttpInterceptorHandler implements HttpHandler {
  constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}

export class MyHandlerService implements HttpHandler {

  private chain: HttpHandler | null = null;

  constructor(private backend: HttpBackend, private injector: Injector, private interceptors: InjectionToken<HttpInterceptor[]>) { }

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector.get(this.interceptors, []);
      this.chain = interceptors.reduceRight(
        (next, interceptor) => new MyHttpInterceptorHandler(next, interceptor), this.backend);
    }
    return this.chain.handle(req);
  }
}

@Injectable()
export class HttpService extends HttpClient {

  constructor(backend: HttpBackend, private injector: Injector) {
    super(new MyHandlerService(backend, injector, HTTP_INTERCEPTORS_CUSTOM));
  }
}
