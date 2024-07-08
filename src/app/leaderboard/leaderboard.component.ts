import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { MatCardModule } from '@angular/material/card';
import { ApiResponse } from '../models/api-response.model';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  private ngUnsubscribe = new Subject<void>();
  private posts$ = new BehaviorSubject<Post[]>([]);

  newComment: string = '';
  posts: Post[] = [];

  ngOnInit() {
    this.postsService.getPosts().subscribe((response: ApiResponse<Post>) => {
      this.posts = response.results;
      console.log('Posts:', this.posts);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // getPosts(): Observable<Post[]> {
  //   this.postsService.getPosts().subscribe((res) => {
  //     this.posts$.next(res.results);
  //   });

  //   return this.posts$.asObservable();
  // }

  // toggleLike(post: Post) {
  //   post.likes_count = !post.liked;
  //   if (post.liked) {
  //     post.likes_count ++;
  //   } else {
  //     post.likes_count --;
  //   }
  // }

  showComments(post: any) {
    // Add logic to show comments
  }

  toggleShare(post: any) {
    // Add logic to toggle share
  }
  // addComment(post: Post) {
  addComment(post: Post) {
    if (this.newComment.trim()) {
      // post.comments.push(this.newComment.trim());
      console.log(this.newComment);

      this.newComment = '';
    }
  }
}
