import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LikeResponse, LikesResponse } from '../models/like.interfaces';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private readonly url =
    'https://trainee-program-api-staging.applaudostudios.com/api/v1/likes';
  private headers = new HttpHeaders().set('content-type', 'application/json');
  constructor(private http: HttpClient) {}

  likeProduct(id: number, kind: string): Observable<LikeResponse> {
    const data = {
      data: {
        product_id: id,
        kind: kind,
      },
    };

    return this.http.post<LikeResponse>(this.url, data, {
      headers: this.headers,
    });
  }

  getLikes(): Observable<LikesResponse> {
    return this.http.get<LikesResponse>(this.url + '?page[size]=0', {
      headers: this.headers,
    });
  }
}
