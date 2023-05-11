import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForgotPasswordRequest } from '../models/forgotPasswordRequest.interface';
import { LoginRequestInterface } from '../models/loginRequest.interface';
import { LoginResponceInterface } from '../models/loginResponse.interface';
import { ResetPasswordRequest } from '../models/resetPasswordRequest.interface';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  PATH_OF_API = environment.apiBaseUrl;
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAthService: UserAuthService
  ) {}

  public login(
    loginData: LoginRequestInterface
  ): Observable<LoginResponceInterface> {
    return this.httpclient.post<LoginResponceInterface>(
      this.PATH_OF_API + '/auth/login',
      loginData,
      {
        headers: this.requestHeader,
      }
    );
  }

  public forgotPassword(
    forgotPasswordData: ForgotPasswordRequest
  ): Observable<any> {
    return this.httpclient.post<any>(
      this.PATH_OF_API + '/auth/forgotPassword',
      forgotPasswordData,
      {
        headers: this.requestHeader,
      }
    );
  }

  public resetPassword(
    resetPasswordRequest: ResetPasswordRequest
  ): Observable<any> {
    return this.httpclient.put<any>(
      this.PATH_OF_API +
        `/auth/resetpassword/${resetPasswordRequest.resetToken}`,
      resetPasswordRequest,
      {
        headers: this.requestHeader,
      }
    );
  }

  public resetPasswordtokenverif(token: String): Observable<any> {
    return this.httpclient.put<any>(
      this.PATH_OF_API + `/auth/verifresetpasswordtoken/${token}`,
      token,
      {
        headers: this.requestHeader,
      }
    );
  }

  public roulesMatch(allowedRole): boolean {
    const userRole: string = this.userAthService.getRole();
    let isMatch = false;

    if (userRole != null && userRole) {
      for (let i = 0; i < allowedRole.length; i++) {
        const role = allowedRole[i];
        if (userRole == role) {
          isMatch = true;
          break;
        }
      }
    }
    return isMatch;
  }
}
