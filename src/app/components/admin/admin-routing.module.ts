import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './../../shared/guards/auth.guard';
import { ListTopicsComponent } from './subjects/list-topics/list-topics.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'register',
      loadChildren: () => import('./register/register.module').then(
        m => m.RegisterModule)
      },
      { path: 'students',
      loadChildren: () => import('./students/students.module').then(
        m => m.StudentsModule)
      },
      { path: 'teachers',
      loadChildren: () => import('./teachers/teachers.module').then(
        m => m.TeachersModule)
      },
      { path: 'subjects',
      loadChildren: () => import('./subjects/subjects.module').then(
        m => m.SubjectsModule)
      },
      { path: 'payment/:register',
      loadChildren: () => import('./payment/payment.module').then(
        m => m.PaymentModule)
      },
      { path: 'topics',
      loadChildren: () => import('./subjects/list-topics/list-topics.module').then(
        m => m.ListTopicsModule)
      },
      {
        path: 'list-topics/:id', component: ListTopicsComponent
      },
      { path: '', redirectTo: 'register', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
