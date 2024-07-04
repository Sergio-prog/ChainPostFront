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
  defaultPosts: any[] = [
    // {
    //   author: {
    //     icon: 'https://sergio-prog.github.io/ChainPostFront/assets/images/person.png',
    //     name: 'John Doe',
    //   },
    //   title: 'Lorem ipsum dolor sit amet',
    //   url: 'https://sergio-prog.github.io/ChainPostFront/assets/images/post.jpg',
    //   likes: 150,
    //   comments: ['super', 'puper'],
    //   shares: 20,
    //   liked: false,
    // },
    // {
    //   author: {
    //     icon: 'https://sergio-prog.github.io/ChainPostFront/assets/images/person.png',
    //     name: 'John Doe',
    //   },
    //   title: 'Lorem ipsum dolor sit amet',
    //   url: 'https://sergio-prog.github.io/ChainPostFront/assets/images/post.jpg',
    //   likes: 150,
    //   comments: ['super', 'puper'],
    //   shares: 20,
    //   liked: false,
    // },
  ];

  posts: any = [];

  constructor(private postsService: PostsService) {}

  private ngUnsubscribe = new Subject<void>();
  private posts$ = new BehaviorSubject<Post[]>([]);

  newComment: string = '';
  // posts: Post[] = [];

  ngOnInit(): void {
    try {
      this.posts = this.postsService.getPosts();
      // this.getPosts()
      //   .pipe(takeUntil(this.ngUnsubscribe))
      //   .subscribe((posts) => {
      //     this.posts = posts;
      //   });
    } catch (error) {
      console.error('Error', error);
      this.posts = this.defaultPosts;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  // getPosts(): Observable<Post[]> {
  //   this.leaderboardService.getPosts().subscribe((res) => {
  //     console.log('123', res.results);
  //     this.posts$.next(res.results);
  //   });

  //   console.log(this.posts$.asObservable());

  //   return this.posts$.asObservable();
  // }

  toggleLike(post: any) {
    post.liked = !post.liked;
    if (post.liked) {
      post.likes_count++;
    } else {
      post.likes_count--;
    }
  }

  showComments(post: any) {
    // Add logic to show comments
  }

  toggleShare(post: any) {
    // Add logic to toggle share
  }
  // addComment(post: Post) {
  addComment(post: any) {
    if (this.newComment.trim()) {
      post?.comments?.push(this.newComment.trim());
      console.log(post.comments);

      this.newComment = '';
    }
  }
}
