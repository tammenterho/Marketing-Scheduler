import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';

  loginSuccessful = new EventEmitter<void>();
  private userDto: UserDto | null = null;

  constructor(private http: HttpClient) {}

  setLogin(response: any): void {
    window.localStorage.setItem('login', JSON.stringify(response));
  }

  setId(response: { id: number }): void {
    window.localStorage.setItem('id', response.id.toString());
  }

  getLogin(): any {
    const userJson = window.localStorage.getItem('login');
    const user = userJson ? JSON.parse(userJson) : null;
    // console.log('User from localStorage:', user);
    return user;
  }

  getAuthToken(): string | null {
    const token = window.localStorage.getItem('auth_token');
    //console.log('Token retrieved from localStorage:', token);
    return token;
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem('auth_token', token);
      //console.log('Token saved to localStorage:', token);
    } else {
      window.localStorage.removeItem('auth_token');
      //console.log('Token removed from localStorage');
    }
  }

  onLoginSuccess(): void {
    this.loginSuccessful.emit();
  }

  request(method: string, url: string, data: any): Observable<any> {
    const headers = new HttpHeaders();
    const authToken = this.getAuthToken();

    console.log('AuthService - Request Data:', data);

    if (authToken !== null) {
      headers.set('Authorization', `Bearer ${authToken}`);

      //console.log('Authorization header set with token:', authToken);
    }

    const requestOptions = {
      headers: headers,
    };

    console.log(`Making ${method} request to ${this.apiUrl}${url}`);

    if (method === 'GET') {
      return this.http.get(`${this.apiUrl}${url}`, requestOptions);
    } else if (method === 'POST') {
      //console.log('Request data:', data);
      return this.http.post(`${this.apiUrl}${url}`, data, requestOptions);
    } else if (method === 'PUT') {
      //console.log('Request data:', data);
      return this.http.put(`${this.apiUrl}${url}`, data, requestOptions);
    } else if (method === 'DELETE') {
      //console.log('Request data:', data);
      return this.http.delete(`${this.apiUrl}${url}`, requestOptions);
    }

    throw new Error('Unsupported HTTP method');
  }
}
