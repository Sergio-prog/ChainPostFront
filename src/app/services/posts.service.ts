import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  // getPosts(): Observable<ApiResponse<Post>> {
  //   return this.http.get<ApiResponse<Post>>(`${environment.apiUrl}/posts`);
  // }

  getPosts() {
    return this.posts;
  }

  posts = [
    {
      author: {
        icon: '../../assets/images/person.png',
        name: 'John Doe',
      },
      title: 'Lorem ipsum dolor sit amet',
      url: '../../assets/images/post.jpg',
      likes: 150,
      comments: ['super', 'puper'],
      shares: 20,
      liked: false,
      created: new Date(),
      earnings: 20,
    },
    {
      author: {
        icon: '../../assets/images/person.png',
        name: 'John Doe',
      },
      title: 'Lorem ipsum dolor sit amet',
      url: 'https://www.gardeners.com/globalassets/articles/gardening/2023content/8078-chive-flowers-edible.jpg',
      likes: 150,
      comments: ['super', 'puper'],
      shares: 20,
      liked: false,
      created: new Date(),
      earnings: 15,
    },
  ];
}
