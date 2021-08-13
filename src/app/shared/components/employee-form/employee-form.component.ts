import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/pages/employees/employees.service';
import Swal from 'sweetalert2';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee : Employee;
  employeeForm : FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router, private fb:FormBuilder, private employeesSvc: EmployeesService) {
    const navigation = this.router.getCurrentNavigation();
    
    if(typeof navigation.extras.state === 'undefined'){
      this.employee = undefined
    } else {
      this.employee = navigation.extras.state.value;
    }
    this.initForm();
  }

  ngOnInit(): void {
    if(typeof this.employee === 'undefined'){
      this.router.navigate(['new']);
    } else {
      this.employeeForm.patchValue(this.employee);
    }
  }

  onSave():void {
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this.employeesSvc.onSaveEmployee(employee, employeeId);
      this.employeeForm.reset();
      Swal.fire('Saved', 'Saved Succefully!', 'success');
    }
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name:['', [Validators.required]],
      last_name:['', [Validators.required ]],
      email:['', [Validators.required, Validators.pattern(this.isEmail)]],
      start_date:['', [Validators.required]]
    });
  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  isValidField(field: string): string {
    const validatedField = this.employeeForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

}
