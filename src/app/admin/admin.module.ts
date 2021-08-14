import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderAdminModule } from '../shared/components/header-admin/header-admin.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderAdminModule
  ]
})
export class AdminModule { }
