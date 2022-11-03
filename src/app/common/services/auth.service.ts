import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { LoginData, LoginResponse } from '../models/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly url =
    'https://trainee-program-api-staging.applaudostudios.com/api/v1/users/login';

  private headers = new HttpHeaders().set('content-type', 'application/json');

  constructor(private http: HttpClient) {}

  login(credentials: LoginData): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(this.url, JSON.stringify(credentials), {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error['errors'][0]);
  }
}
