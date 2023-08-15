import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from '../shared/common.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardtService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  fetchDealStats() {
    return this.http.get(`${this.commonService.baseUrl}/deal/stats`);
  }
}
