import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  employee: any = null;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation.extras.state;
  }

  ngOnInit(): void {
  }

  onGoToEdit(): void {
    this.navigationExtras.state.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
  }  

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  onDelete():void {
    Swal.fire("Deleted");
  }

}
