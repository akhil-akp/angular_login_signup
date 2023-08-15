import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private baseUrl = 'http://localhost:1337/api/v1';

  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService,
    private socialAuthService: SocialAuthService
  ) {}

  login(username: string, password: string) {
    return this.http.post(`${this.commonService.baseUrl}/auth/admin-login`, {
      username,
      password,
    });
  }

  loginWithGoogle(idToken: string) {
    return this.http.post(`${this.commonService.baseUrl}/auth/google-login`, {
      idToken: idToken,
      deviceType: 'web',
    });
  }

  signup(signupFrom: any) {
    return this.http.post(
      `${this.commonService.baseUrl}/auth/admin-signup`,
      signupFrom
    );
  }

  forgotPassword(email: string) {
    return this.http.post(
      `${this.commonService.baseUrl}/auth/forgot-password`,
      {
        email: email,
      }
    );
  }

  resetPassword(resetToken: string, password: string) {
    return this.http.post(
      `${this.commonService.baseUrl}/auth/reset-password/${resetToken}`,
      {
        password: password,
      }
    );
  }

  updatePassword(currentPassword: string, newPassword: string) {
    return this.http.post(
      `${this.commonService.baseUrl}/auth/update-password`,
      {
        currentPassword,
        newPassword,
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getLoginUser() {
    return localStorage.getItem('user');
  }
}
