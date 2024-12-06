import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.models';
import { MatListModule } from '@angular/material/list';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from "../../shared.module";
import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { flashAnimation } from '../../annimations/flash.animation';
import { slideAndFadeAnimation } from '../../annimations/slide-and-fade.animation';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MatListModule,
    DatePipe,
    NgIf,
    NgFor,
    MatFormField,
    MatInput,
    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    SharedModule
],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
  animations:[
    trigger('list', [
      transition(':enter', [
          query('@listItem', [
              stagger(50, [
                  animateChild()
              ])
          ])
      ])
  ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
      transition(':enter', [
        query('span', [
            style({
                opacity: 0
            }),
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
              time: '500ms',
              startColor: 'rgb(201, 157, 242)'
          }
      }),
        group([
          useAnimation(flashAnimation, {
            params: {
                time: '250ms',
                flashColor: 'rgb(249,179,111)'
            }
        }),
          query('.comment-text', [
            animate('250ms', style({
                opacity: 1
            }))
          ]),
          query('.comment-date', [
            animate('500ms', style({
                opacity: 1
            }))
          ]),
        ]),
      ])
    ])  
  ]
})
export class CommentsComponent implements OnInit{
  animationStates: { [key: number]: 'default' | 'active' } = {};

  @Input() comments!: Comment[]
  @Output() newComment = new EventEmitter<string>()

  commentCtrl!: FormControl

  constructor(private forbuilder: FormBuilder){}

  ngOnInit(): void {
    this.commentCtrl=this.forbuilder.control('', [Validators.required, Validators.minLength(10)])
    for (let index in this.comments){
      this.animationStates[index]='default'
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid){
      return
    }   
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
        id: maxId + 1,
        comment: this.commentCtrl.value,
        createdDate: new Date().toISOString(),
        userId: 1
    });
 
    this.newComment.emit(this.commentCtrl.value)
    this.commentCtrl.reset()
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
      this.animationStates[index] = 'default';
  }
}
