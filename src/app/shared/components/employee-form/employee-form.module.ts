import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form.component';



@NgModule({
  declarations: [EmployeeFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [EmployeeFormComponent]
})
export class EmployeeFormModule { }
