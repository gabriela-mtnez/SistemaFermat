import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTopicsComponent } from './list-topics.component';

const routes: Routes = [{ path: '', component: ListTopicsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTopicsRoutingModule { }
