/** define list http error code */
export const enum ApiErrorCode {
 /** Success status */
 SUCCESS_STATUS = 200,
 /** Invalid token */
 INVALID_TOKEN = 'invalid_token',
 /** Token expired */
 TOKEN_EXPIRED = 'Access token expired: ',
 /** Refresh token expired */
 REFRESH_TOKEN_EXPIRED = 'Invalid refresh token (expired):',
 /** Account is lock */
 ACCOUNT_IS_LOCK = '423',
 /** Unauthorized */
 UNAUTHORIZED = 'unauthorized',
 /** Unauthorized status */
 UNAUTHORIZED_STATUS = '401',
}
