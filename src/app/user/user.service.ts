import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private commonService: CommonService, private http: HttpClient) {}

  userDetails() {
    return this.http.get<any>(`${this.commonService.baseUrl}/user/get-me`);
  }

  updateUser(userInfo: any) {
    return this.http.put(
      `${this.commonService.baseUrl}/user/update-me`,
      userInfo
    );
  }

  updateProfileImage(file: any) {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.http.post(
      `${this.commonService.baseUrl}/user/profile-image`,
      formData
    );
  }
}
