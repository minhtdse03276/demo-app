export interface LoginModel {
 access_token: string;
 token_type: string;
 refresh_token: string;
 expires_in: number;
 scope: string;
 email: string;
 phoneNumber: string;
 userId: string;
 roleID: string;
 client_group: string;
 roleName: string;
 status: number;
 resCode: string;
 paymentType?: number;
 jti: string;
}
