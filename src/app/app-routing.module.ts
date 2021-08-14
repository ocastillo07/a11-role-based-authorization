import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from './pages/container-app/container-app.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ContainerAppComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
      { path: 'list', loadChildren: () => import('./pages/employees/list/list.module').then(m => m.ListModule) }, 
      { path: 'new', loadChildren: () => import('./pages/employees/new/new.module').then(m => m.NewModule) }, 
      { path: 'details', loadChildren: () => import('./pages/employees/details/details.module').then(m => m.DetailsModule) }, 
      { path: 'edit', loadChildren: () => import('./pages/employees/edit/edit.module').then(m => m.EditModule) }, 
      { 
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  
  { path: 'signup', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule) },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  
  { 
    path: 'admin', 
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
