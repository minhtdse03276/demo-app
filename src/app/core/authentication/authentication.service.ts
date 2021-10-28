import { LoginModel } from './../model/login.model';
import { ErrorService } from './../errors/error.service';
import { ApiUri } from './../common-service/api-uri';
import { UriService } from './../uri/uri.service';
import { StorageService } from './../storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CommonServiceService } from './../common-service/common-service.service';
import { HttpContentType } from '../common-service/http-content-type';
import { StorageKey } from '../storage/storage-key';
import { resCodeUserLogin } from '../common-service/response-code-user-login';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  /**
   * Constructor
   * @param communicationService CommunicationService
   * @param storage StorageService
   * @param http HttpClient
   * @param uriService UriService
   * @param router Router
   * @param cookieService CookieService
   * @param storageService StorageService
   * @param searchService SearchService
   */
  constructor(
    private commonService: CommonServiceService,
    private storage: StorageService,
    private http: HttpClient,
    private uriService: UriService,
    private router: Router,
    private cookieService: CookieService,
    private storageService: StorageService,
  ) {
  }

  /**
   * check is logged-in
   */
  public isLoggedIn(): boolean {
    return !!this.storageService.get(StorageKey.LOGGED_USER, false);
  }

  /**
   * check is logged-in
   */
  public isFirstLogin(): boolean {
    return this.storageService.getUserInfoByKey('resCode') === '01';
  }

  /**
   * check current role is merchant
   */
  public isMerchant(): boolean {
    const roleName = this.storage.getUserInfoByKey('roleName');
    return roleName === 'Merchant';
  }

  /**
   * Check current screen is change password screen and current account is first login
   */
  public isChangePassAndFirstPassword(): boolean {
    return this.isFirstLogin() && this.router.url === this.uriService.PROFILE_CHANGE_PASSWORD;
  }

  /**
   * Get token
   * @param userData any
   */
  public getToken(userData: any): Observable<LoginModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': HttpContentType.URLENCODED,
        'Authorization': 'Basic ' + btoa(environment.basicAuth)
      })
    };
    const url = ApiUri.USER_LOGIN_POST;
    const body = new URLSearchParams({
      'grant_type': 'password',
      'username': userData.username,
      'password': userData.password
    });
    return this.commonService.getToken(url, httpOptions, body)
      .pipe(
        catchError((error: any) => {
          if (error.error.resCode === resCodeUserLogin.incorrectPass
            || error.error.resCode === resCodeUserLogin.lockInTenMinute
            || error.error.resCode === resCodeUserLogin.lock) {
            return throwError(error.error.soaErrorDesc);
          }
          return throwError(ErrorService.parserError(error));
        }),
        switchMap((res: LoginModel) => {
          let expires ;
          this.storage.set(StorageKey.LOGGED_USERNAME, userData.username);
          this.storage.set(StorageKey.LOGGED_USERID, res.userId);
          this.storage.set(StorageKey.LOGGED_USER, res);
          this.storage.set(StorageKey.REFRESH_USER_TOKEN, res.refresh_token);
          // save access token to cookie
          this.cookieService.set(StorageKey.USER_TOKEN, res.access_token, expires, '/', '', false, 'Lax');
          return of(res);
        })
      );
  }

  /**
   * remove user form session storage to log user out
   */
  logout(redirect?: any) {
    return this.commonService.delete(ApiUri.USER_LOGOUT, null).subscribe(
      () => { /* success */
        this.commonService.clearStorage(redirect ? redirect : null);
      },
      () => { /* error */
        this.commonService.clearStorage(redirect ? redirect : null);
      }
    );
  }

}
