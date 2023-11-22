import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  employeeForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    contactno: new FormControl('')
  });

  employmentForm = new FormGroup({
    position: new FormControl(''),
    emp_status: new FormControl(''),
    start_date: new FormControl(''),
    salary: new FormControl('')
  });


  constructor(private alert: AlertService, private empServ: EmployeesService) { }

  ngOnInit(): void {
  }
  currentStep: number = 1;

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }


  // creating an employee
  createEmployee() {

    if (!this.employeeForm.valid) {
      this.alert.error('All fileds are required');
      return;
    }

    // user object
    let employee = {
      first_name: this.employeeForm.value.first_name,
      last_name: this.employeeForm.value.last_name,
      email: this.employeeForm.value.email,
      gender: this.employeeForm.value.gender,
      contactno: this.employeeForm.value.contactno
    };




  }


  // adding the empoyment details for an employee
  empDetails() {

  }
}
