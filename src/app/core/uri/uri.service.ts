import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UriService {
  ERROR_PAGE_NOT_FOUND = '/page-not-found';
  ERROR_FORBIDDEN_ACCESS = '/access-denied';
  LOGIN = '/auth/login';
  LOGOUT = '/logout';
  FORGOT_PASSWORD = '/auth/forgot-password';

  PROFILE_CHANGE_PASSWORD = '/change/password'

  COMMON_ERROR_SCREEN = '/common-error-screen';


  constructor() {
  }


  /**
   * Get all un-authentication allow
   */
  getUnAuthenticationAllow(): string[] {
    return [
      this.LOGIN,
      this.LOGOUT,
      this.FORGOT_PASSWORD,
      this.ERROR_PAGE_NOT_FOUND,
      this.ERROR_FORBIDDEN_ACCESS,
    ];
  }


}
