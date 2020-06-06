import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';

import { ListPostsRoutingModule } from './../../posts/list-posts/list-posts-routing.module';
import { ListPostsComponent } from './../../posts/list-posts/list-posts.component';
import { MaterialModule } from '../../../material.module';
import { TableComponent } from '../../../shared/components/table/table.component';

@NgModule({
  declarations: [TeachersComponent, ListPostsComponent, TableComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    ListPostsRoutingModule,
    MaterialModule
  ],
  exports: [ListPostsComponent, TableComponent]
})
export class TeachersModule { }
