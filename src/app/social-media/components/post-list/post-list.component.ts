import { Component, OnInit } from '@angular/core';
import { PostListItemComponent } from "../post-list-item/post-list-item.component";
import { Observable, map } from 'rxjs';
import { Post } from '../../models/post.models';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgFor, NgForOf } from '@angular/common';
import { PostsService } from '../../service/post.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    PostListItemComponent,
    AsyncPipe,
    NgFor
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  
  constructor(private route:ActivatedRoute,
              private postsService: PostsService){}
  
  post$!: Observable<Post[]>
  
  ngOnInit(): void {
    this.post$ = this.route.data.pipe(
      map(data=>data['posts'])
    ) 
  }

  onPostCommented(postCommented: { comment: string, postId: number }) {
    this.postsService.addNewComment(postCommented);
  }
  
}
