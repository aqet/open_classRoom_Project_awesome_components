import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidatesService } from './services/candidates.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    HttpClientModule
  ],
  providers:[
    CandidatesService,
    SharedModule
  ]
})
export class ReactiveStateModule { }
