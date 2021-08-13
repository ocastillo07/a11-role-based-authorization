import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  employees$ = this.employeesSvc.employees;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  };

  // fakeData = [{
  //     name: 'Lakendra',
  //     last_name: 'Kutch',
  //     email: 'lashawnda@macejkovic.co',
  //     start_date: '01/02/2021'
  //   },
  //   {
  //     name: 'Hollis',
  //     last_name: 'Hintz',
  //     email: 'bradford@mitchell.name',
  //     start_date: '01/02/2021'
  //   },
  //   {
  //     name: 'Daniele',
  //     last_name: 'Dooley',
  //     email: 'edelmira_brakus@schaefer.io',
  //     start_date: '01/02/2021'
  //   },
  //   {
  //     name: 'Miss Armando',
  //     last_name: 'Wolff',
  //     email: 'trey@satterfield.co',
  //     start_date: '01/02/2021'
  //   },
  //   {
  //     name: 'Belva',
  //     last_name: 'Wolff LLD',
  //     email: 'marva.jones@fay',
  //     start_date: '01/02/2021'
  //   },
  //   {
  //     name: 'Wanita',
  //     last_name: 'Langworth',
  //     email: 'veda_buckridge@weber.com',
  //     start_date: '01/02/2021'
  //   }
  // ];

  constructor(private router: Router, private employeesSvc: EmployeesService) { }


  ngOnInit(): void {
  }

  onGoToEdit(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }  

  onGoToDetails(item: any): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  async onGoToDelete(empId: string): Promise<void> {
    try {
      await this.employeesSvc.onDeleteEmployees(empId);
      Swal.fire('Employee Deleted');
    } catch (err) {
      console.log(err);
    }
  }

}
