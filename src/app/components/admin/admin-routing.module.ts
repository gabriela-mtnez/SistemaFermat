import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from './../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'posts',
      //   loadChildren: () => import('../posts/list-posts/list-posts.module').then(
      //     m => m.ListPostsModule
      //   )
      // },
      // { path: 'profile',
      // loadChildren: () => import('./profile/profile.module').then(
      //   m => m.ProfileModule)
      // },
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
