/** define list http error code */
export const enum SoaErrorCode {
 /** Account is lock */
 ACCOUNT_IS_LOCK = '423',
 /** There are many people logging in to the same account */
 MANY_PEOPLE_LOGGING_IN = '207',
 /** Unknown error */
 INTERNAL_SERVER_ERROR = '500'
}
