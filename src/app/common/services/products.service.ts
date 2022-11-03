import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Datum,
  ProductResponse,
  ProductsResponse,
} from '../models/products.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url =
    'https://trainee-program-api-staging.applaudostudios.com/api/v1/products';
  private readonly url_include_options =
    'include=image_attachment.blob,master,category';
  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders().set('content-type', 'application/json');

  getProducts(
    page: number = 1,
    category?: number,
    name?: string
  ): Observable<ProductsResponse> {
    const url = `${this.url}?page[size]=5&page[number]=${page}&${
      this.url_include_options
    }${category ? `&[filter][category_id_eq]=${category}` : ''}${
      name ? `&[filter][name_cont]=${name}` : ''
    }`;
    return this.http.get<ProductsResponse>(url, {
      headers: this.headers,
    });
  }
  getProduct(slug: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      this.url + `/${slug}` + `?${this.url_include_options}`,
      {
        headers: this.headers,
      }
    );
  }
}
