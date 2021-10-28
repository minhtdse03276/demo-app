/**
 * declare all storage key
 */
 export const enum StorageKey {
  LAST_REQUEST_TIME = 'lastRequestTime',
  USER_TOKEN = 'token', // token of logged-in user
  REFRESH_USER_TOKEN = 'refresh_token', // refresh token of logged-in user
  LOGGED_USER = 'user', // logged-in user
  LOGGED_USERNAME = 'userName', // name of logged-in user
  LOGGED_USERID = 'userId', // id of logged-in user
  CLIENT_MESSAGE_ID = 'clientMessageId', // clientMessageId of logged-in user
}
