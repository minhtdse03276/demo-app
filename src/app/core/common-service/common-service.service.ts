import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageKey } from '../storage/storage-key';
import { StorageService } from '../storage/storage.service';
import { UriService } from '../uri/uri.service';
import { HttpContentType } from './http-content-type';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  public contentType: HttpContentType = HttpContentType.URLENCODED;
  public baseUrl: string;
  public download = false;

  /**
   * @param http HttpClient
   * @param storage StorageService
   * @param cookieService CookieService
   * @param router Router
   * @param uriService UriService
   */
  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private cookieService: CookieService,
    private router: Router,
    private uriService: UriService,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  /**
   * Get JWT token
   * @returns Token
   */
  static getClientMessageId(): string {
    return uuidv4();;
  }

  /**
   * Do something after receive data from server
   */
  public afterReceiveData() {
    this.download = false;
    this.storage.set(StorageKey.LAST_REQUEST_TIME, new Date());
  }

  /**
   * Do something before request API
   */
  public beforeRequestApi() {
    return;
  }

  /**
   * Request method GET
   * @param uri string
   * @param payload any
   */
  public get(uri: string, payload: any): Observable<any> {
    this.beforeRequestApi();
    return this.http.get(this.baseUrl + uri, {
     headers: this.getHttpHeader(),
      params: payload,
      responseType: this.download ? 'blob' as 'json' : 'json'
    }).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request method GET
   * @param uri string
   * @param payload any
   */
  public getFullUrl(uri: string, payload: any): Observable<any> {
    this.beforeRequestApi();
    return this.http.get(uri, {
      params: payload,
      headers: this.getHttpHeader(),
      responseType: 'json'
    }).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request method POST
   * @param uri string
   * @param payload any
   * @param queryStringParams HttpParams
   */
  public post(uri: string, payload: any, queryStringParams?: HttpParams): Observable<any> {
    this.beforeRequestApi();
    return this.http.post(this.baseUrl + uri, payload,
      {
        params: queryStringParams,
        headers: this.getHttpHeader(),
        responseType: 'json'
      }
    ).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request Token
   * @param uri string
   * @param header any
   * @param payload any
   * @param queryStringParams HttpParams
   */
  public getToken(uri: string, header: any, payload: any, queryStringParams?: HttpParams): Observable<any> {
    this.beforeRequestApi();
    return this.http.post(environment.baseUrl + uri, payload.toString(), header).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request method PUTData
   * @param uri string
   * @param header any
   */
  public putData(uri: string, header: any): Observable<any> {
    this.beforeRequestApi();
    return this.http.put(environment.baseUrl + uri, null, header).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request method PUT
   * @param uri string
   * @param payload any
   * @param queryStringParams HttpParams
   */
  public put(uri: string, payload: any, queryStringParams?: HttpParams): Observable<any> {
    this.beforeRequestApi();
    return this.http.put(this.baseUrl + uri, payload,
      {
        params: queryStringParams,
        headers: this.getHttpHeader(),
        responseType: 'json'
      }
    ).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request method PATCH
   * @param uri string
   * @param payload any
   * @param queryStringParams HttpParams
   */
  public patch(uri: string, payload: any, queryStringParams?: HttpParams): any {
    this.beforeRequestApi();
    return this.http.patch(this.baseUrl + uri, payload,
      {
        params: queryStringParams,
        headers: this.getHttpHeader(),
        responseType: 'json'
      }
    ).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Request method DELETE
   * @param uri string
   * @param payload any
   */
  public delete(uri: string, payload: any): any {
    this.beforeRequestApi();
    return this.http.delete(this.baseUrl + uri, {
      params: payload,
      headers: this.getHttpHeader(),
      responseType: 'json'
    }).pipe(
      tap(() => this.afterReceiveData())
    );
  }

  /**
   * Get JWT token
   * @returns Token
   */
  public getJwtToken(): string {
    const loggedUser = this.storage.get(StorageKey.LOGGED_USER);
    const token = this.cookieService.get(StorageKey.USER_TOKEN);
    if (token && loggedUser) {
      const tokenType = loggedUser.token_type;
      return tokenType ? `${tokenType} ${token}` : '';
    }
    return '';
  }

  /**
   * Clear storage
   * @param redirect string
   */
  public clearStorage(redirect?: string) {
    this.storage.clear();
    this.cookieService.deleteAll(environment.cookiePath);
    this.router.navigate([redirect ? redirect : this.uriService.LOGIN]).then();
  }

  /**
   * Function get base http request header
   * @returns HttpHeaders
   */
  private getHttpHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': this.contentType,
      'Authorization': this.getJwtToken(),
      'ClientMessageId': CommonServiceService.getClientMessageId()
    });
  }
}
