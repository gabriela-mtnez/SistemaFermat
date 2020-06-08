import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule} from '../../material.module';
import { ListTopicsModule } from '../../components/admin/subjects/list-topics/list-topics.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ListTopicsModule
  ]
})
export class AdminModule { }
