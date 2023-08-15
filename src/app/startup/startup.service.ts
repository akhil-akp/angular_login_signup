import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  // baseUrl = 'http://localhost:1337/api/v1';
  constructor(
    private http: HttpClient,
    private router: Router,
    private commonService: CommonService
  ) {}

  getStartups() {
    return this.http.get(`${this.commonService.baseUrl}/start-up/get-all`);
  }
}
