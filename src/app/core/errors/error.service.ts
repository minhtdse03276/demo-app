import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(
    private router: Router) {
  }

  /**
   * provider error message by type
   * @param type string
   */
  static commonErrorMessage(type: string): string {
    return 'Tài khoản không tồn tại trong hệ thống.';
  }

  /**
   * Parser error
   * @param error Error
   */
  static parserError(error: any): string {
    if (typeof error !== 'undefined') {
      if (typeof error.error !== 'undefined') {
        if (typeof error.error.soaErrorDesc !== 'undefined') {
          return error.error.soaErrorDesc;
        }
        if (typeof error.error.message !== 'undefined') {
          return error.error.message;
        }
      }
      if (typeof error.message !== 'undefined') {
        return error.message;
      }
    }
    console.log(error);
    return 'Lỗi không xác định';
  }

  /**
   * Get client error message
   * @param error Error
   */
  getClientErrorMessage(error: Error): string {
    return error.message ?
      error.message :
      error.toString();
  }

  /**
   * Get server error message
   * @param error Error
   */
  getServerErrorMessage(error: HttpErrorResponse): string {
    return navigator.onLine ?
      error.message :
      'No Internet Connection';
  }

  /**
   * Check if system can't match any router
   * @param error Error
   */
  isNotFoundUrl(error: any): boolean {
    return typeof error.rejection !== 'undefined';
  }

  /**
   * handle when error page not found occurred
   */
  async handlePageNotFound() {
    console.warn('[TYPE] page not found');
    await this.router.navigate(['/page-not-found']);
  }

  /**
   * handle when error call api fail
   */
  handleApiFail(error: any) {
    console.warn('[TYPE] call api fail');
    console.warn('[MESSAGE] ' + this.getServerErrorMessage(error));
  }

  /**
   * handle when error code
   */
  handleCommonCodeError(error: any) {
    console.warn('[TYPE] error code');
    console.warn('[MESSAGE] ' + this.getClientErrorMessage(error));
  }

}
