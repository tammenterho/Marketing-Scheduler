import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { User } from '../User';
import { map, catchError } from 'rxjs/operators';
import { ConsoleLogger } from '@angular/compiler-cli';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5050/api/users/';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getUsers(): Observable<User[]> {
    console.log('haetaan nyt servicessä');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + this.auth.getAuthToken(),
    });

    return this.http.get<User[]>(this.apiUrl, { headers: headers });
  }

  deleteUserById(user: User): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.auth.getToken(),
    });
    const deleteUrl = `${this.apiUrl}/${user.id}`;
    // console.log('deleting');

    return this.http
      .delete(deleteUrl, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          console.log('tämä on responsestatus' + response.status);
          if (response.status === 200 || response.status === 204) {
            return 'deleted';
          } else {
            throw new Error('Unexpected response status: ' + response.status);
          }
        })
      );
  }
}
