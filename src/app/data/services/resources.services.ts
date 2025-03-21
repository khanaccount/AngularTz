import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { ResourcesResponse } from '../interface/resources.interface';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = 'https://reqres.in/api';
  getResources() {
    const url = `${this.baseApiUrl}/unknown`;
    return this.http.get<ResourcesResponse>(url);
  }
}
