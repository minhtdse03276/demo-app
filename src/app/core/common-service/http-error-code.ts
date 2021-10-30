/** define list http error code */
export const enum HttpErrorCode {
 /** UNKNOWN code */
 UNKNOWN = -1,
 /** 200 OK */
 OK = 200,
 /** 201 created code */
 CREATED = 201,
 /** 400 Bad Request */
 BAD_REQUEST = 400,
 /** 401 Unauthorized (RFC 7235) */
 UNAUTHORIZED = 401,
 /** 403 Forbidden */
 FORBIDDEN = 403,
 /** 404 Not Found */
 NOT_FOUND = 404,
 /** 500 Internal Server Error */
 INTERNAL_SERVER_ERROR = 500,
 /** Timeout from client */
 TIMEOUT = 999,
 /** 408 Request Timeout */
 REQUEST_TIMEOUT = 408,
 /** 409 CONFLICT */
 CONFLICT = 409,
 /** 413 PAYLOAD TOO LARGE */
 PAYLOAD_TOO_LARGE = 413,
}
