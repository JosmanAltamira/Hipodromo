import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post(`${environment.baseUrl}/login`, user);
  }

  register(user: User) {
    return this.http.post(`${environment.baseUrl}/register`, user);
  }

  logout() {
    return this.http.post(`${environment.baseUrl}/logout`, {});
  }

  isLoggedIn() {
    const token = localStorage.getItem('expenseAppToken');
    return !!token;
  }
}
