import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  baseUrl = 'http://localhost:1337/api/v1';
  constructor() {}
}
