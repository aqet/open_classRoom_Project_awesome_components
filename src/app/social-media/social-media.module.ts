import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaRoutingModule } from './social-media-routing.module';
import { PostsService } from './service/post.service';
import { PostsResolver } from './resolvers/posts.resolver';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocialMediaRoutingModule,
    SharedModule
  ],
  providers:[
    PostsService,
    PostsResolver
  ]
})
export class SocialMediaModule { }
