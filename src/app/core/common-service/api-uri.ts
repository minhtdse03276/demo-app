/** define list http error code */
import { environment } from "src/environments/environment";
export const API_SOMETHING_FEATURE = 'account/api/user';

export class ApiUri {
  static USER_LOGIN_POST = 'account/oauth/token';
  static USER_LOGOUT = 'logout';
  static USER_MENU = API_SOMETHING_FEATURE + environment.apiVersion + 'menu';
}
