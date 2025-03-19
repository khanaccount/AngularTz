import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UsersResponse } from '../interface/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = 'https://reqres.in/api';
  getUsers() {
    return this.http.get<UsersResponse>(`${this.baseApiUrl}/users?page=2`);
  }
}
