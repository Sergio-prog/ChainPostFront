import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

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
  posts = [
    {
      author: {
        icon: 'https://sergio-prog.github.io/ChainPostFront/assets/images/person.png',
        name: 'John Doe',
      },
      title: 'Lorem ipsum dolor sit amet',
      url: 'https://sergio-prog.github.io/ChainPostFront/assets/images/post.jpg',
      likes: 150,
      comments: ['super', 'puper'],
      shares: 20,
      liked: false,
    },
    {
      author: {
        icon: 'https://sergio-prog.github.io/ChainPostFront/assets/images/person.png',
        name: 'John Doe',
      },
      title: 'Lorem ipsum dolor sit amet',
      url: 'https://sergio-prog.github.io/ChainPostFront/assets/images/post.jpg',
      likes: 150,
      comments: ['super', 'puper'],
      shares: 20,
      liked: false,
    },
  ];

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
