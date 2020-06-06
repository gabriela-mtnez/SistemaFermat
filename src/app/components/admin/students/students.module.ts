import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

import { ListPostsRoutingModule } from './../../posts/list-posts/list-posts-routing.module';
// import { ListPostsComponent } from './../../posts/list-posts/list-posts.component';
import { MaterialModule } from '../../../material.module';
// import { TableComponent } from '../../../shared/components/table/table.component';
import { TeachersModule } from './../teachers/teachers.module';


@NgModule({
  declarations: [StudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ListPostsRoutingModule,
    MaterialModule,
    TeachersModule
  ]
})
export class StudentsModule { }
