/** define list http error code */
export const enum resCodeUserLogin {
 /** resCode = 00 */
 loginSuccess = '00',
 /** resCode = 01 */
 fistLogin = '01',
 /** resCode = 02 */
 incorrectPass = '02',
 /** resCode = 03 */
 lockInTenMinute = '03',
 /** resCode = 04 */
 lock = '04',
 /** resCode = 05 */
 inactiveWhileLogin = '05',
}
