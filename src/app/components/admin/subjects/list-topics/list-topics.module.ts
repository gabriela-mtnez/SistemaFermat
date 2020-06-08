import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTopicsRoutingModule } from './list-topics-routing.module';
import { ListTopicsComponent } from './list-topics.component';
import { MaterialModule } from '../../../../material.module';


@NgModule({
  declarations: [ListTopicsComponent],
  imports: [
    CommonModule,
    ListTopicsRoutingModule,
    MaterialModule
  ]
})
export class ListTopicsModule { }
