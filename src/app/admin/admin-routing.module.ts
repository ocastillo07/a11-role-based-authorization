import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { 
    path: '', 
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'list', loadChildren: () => import('./users/list/list.module').then(m => m.ListModule) }, 
      { path: 'edit', loadChildren: () => import('./users/edit/edit.module').then(m => m.EditModule) }, 
      { path: 'details', loadChildren: () => import('./users/details/details.module').then(m => m.DetailsModule) }, 
      { path: 'new', loadChildren: () => import('./users/new/new.module').then(m => m.NewModule) },
      { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
      { 
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
      }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
