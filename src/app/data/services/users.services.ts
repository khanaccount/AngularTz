import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UsersResponse } from '../interface/users.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  http: HttpClient = inject(HttpClient);
  baseApiUrl = 'https://reqres.in/api';
  getUsers(page: number = 1): Observable<UsersResponse> {
    const url = `${this.baseApiUrl}/users?page=${page}`;
    return this.http.get<UsersResponse>(url);
  }
}
