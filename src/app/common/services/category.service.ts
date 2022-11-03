import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../models/categories.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly url =
    'https://trainee-program-api-staging.applaudostudios.com/api/v1/categories?page[size]=0';
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders().set('content-type', 'application/json');
  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.url, {
      headers: this.headers,
    });
  }
}
