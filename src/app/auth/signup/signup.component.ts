import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      email : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  signup(formData: FormData){
    this.authService.signUp(formData["email"], formData["password"]);
  }

}