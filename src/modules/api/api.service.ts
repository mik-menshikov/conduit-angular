import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ArticlesResult,
  LoginRequest,
  LoginResponse,
  User,
} from 'src/modules/api/interfaces';

const baseUrl = 'http://localhost:3000/api';

const jsonHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  login(creds: LoginRequest) {
    return this.http.post<LoginResponse>(
      `${baseUrl}/users/login`,
      JSON.stringify(creds),
      { headers: jsonHeaders }
    );
  }

  getUser() {
    return this.http.get<LoginResponse>(`${baseUrl}/user`, {
      headers: jsonHeaders,
    });
  }

  loadArticles() {
    return this.http.get<ArticlesResult>(`${baseUrl}/articles`);
  }
}
