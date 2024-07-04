import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environments';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(
      `http://www.chainmess.com/posts/list`,
    );
  }
}
