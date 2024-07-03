import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { Post } from '../models/post.model';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
  ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  // posts = [
  //   {
  //     author: {
  //       icon: '../../assets/images/person.png',
  //       name: 'John Doe',
  //     },
  //     title: 'Lorem ipsum dolor sit amet',
  //     url: '../../assets/images/post.jpg',
  //     likes: 150,
  //     comments: ['super', 'puper'],
  //     shares: 20,
  //     liked: false,
  //   },
  //   {
  //     author: {
  //       icon: '../../assets/images/person.png',
  //       name: 'John Doe',
  //     },
  //     title: 'Lorem ipsum dolor sit amet',
  //     url: '../../assets/images/post.jpg',
  //     likes: 150,
  //     comments: ['super', 'puper'],
  //     shares: 20,
  //     liked: false,
  //   },
  // ];

  constructor(private leaderboardService: LeaderboardService) {}

  private ngUnsubscribe = new Subject<void>();
  private posts$ = new BehaviorSubject<Post[]>([]);

  posts: Post[] = [];

  ngOnInit(): void {
    this.getPosts()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((posts) => {
        this.posts = posts;
      });
    console.log(this.posts);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getPosts(): Observable<Post[]> {
    this.leaderboardService.getPosts().subscribe((res) => {
      this.posts$.next(res.results);
    });

    return this.posts$.asObservable();
  }

  toggleLike(post: any) {
    post.liked = !post.liked;
    if (post.liked) {
      post.likes++;
    } else {
      post.likes--;
    }
  }

  showComments(post: any) {
    // Add logic to show comments
  }

  toggleShare(post: any) {
    // Add logic to toggle share
  }
}
