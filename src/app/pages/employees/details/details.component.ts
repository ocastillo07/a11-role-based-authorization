import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.interface';
import Swal from 'sweetalert2';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  employee : Employee = null;

  constructor(private router: Router, private employeesSvc: EmployeesService) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation.extras.state.value;
  }

  ngOnInit(): void {
    if(typeof this.employee === 'undefined') {
      this.router.navigate(['list']);
    }
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
  }  

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  async onGoToDelete(): Promise<void> {
    try {
      await this.employeesSvc.onDeleteEmployees(this.employee?.id);
      Swal.fire("Deleted");
      this.onGoBackToList();
    } catch (err) {
      console.log(err);
    }
  }

}
