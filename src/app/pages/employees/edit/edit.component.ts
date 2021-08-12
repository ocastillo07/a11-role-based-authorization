import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  value = null;
  employeeForm : FormGroup;
  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router,
              private fb:FormBuilder) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation.extras.state;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSave():void {
    console.log(this.employeeForm.value);
    Swal.fire('Saved', 'Saved Succefully!', 'success');
  }

  private initForm(): void {
    this.employeeForm = this.fb.group({
      name:['', [Validators.required]],
      last_name:['', [Validators.required ]],
      email:['', [Validators.required, Validators.pattern(this.isEmail)]],
      start_date:['', [Validators.required]]
    });
  }

}
