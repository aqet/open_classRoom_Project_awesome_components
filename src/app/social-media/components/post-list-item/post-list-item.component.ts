import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.models';
import { DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { CommentsComponent } from "../../../shared/components/comments/comments.component";
import { SharedModule } from "../../../shared/shared.module";

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatCardModule,
    MatCardActions,
    DatePipe,
    NgIf,
    CommentsComponent,
    SharedModule
],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent implements OnInit {
  @Input() post!: Post
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();
  
  tempuser={lastName: 'tientcheu', firstName: 'igor'}


  onNewComment(comment: string) {
    this.postCommented.emit({ comment: comment, postId: this.post.id });
  }

  ngOnInit(): void {
    
  }
}
