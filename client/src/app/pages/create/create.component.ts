import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Employees } from 'src/app/interfaces/employees';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  employee: any;
  details: any;

  employeeForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    gender: new FormControl(''),
    contactno: new FormControl('')
  });

  employmentForm = new FormGroup({
    position: new FormControl(''),
    start_date: new FormControl(''),
    salary: new FormControl('')
  });


  constructor(private alert: AlertService, private empServ: EmployeesService, private router: Router) { }

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


    this.empServ.addEmployee(employee).subscribe(
      (res: any) => {
        this.alert.success(res.message)
        localStorage.setItem('employee', JSON.stringify(res));
        this.nextStep()
      },
      (error) => {
        this.alert.error(error.error.message)
      }

    )

  }


  // adding the empoyment details for an employee
  empDetails() {

    if (!this.employmentForm.valid) {
      this.alert.error('All fileds are required');
      return;
    }

    this.employee = JSON.parse(localStorage.getItem('employee') || '');

    // user object
    let employment = {
      employee: this.employee.res[0].emp_id,
      position: this.employmentForm.value.position,
      start_date: this.employmentForm.value.start_date,
      salary: this.employmentForm.value.salary
    };


    this.details = employment

    this.alert.success("Details successfully added")

    this.nextStep()

  }



  save() {
    this.empServ.addDetails(this.details).subscribe(
      (res: any) => {
        this.alert.success(res.message)

        console.log("hey hey heeey");
        this.router.navigate(['private/dash'])
      },
      (error) => {
        this.alert.error(error.error.message)
      }

    )

  }


}
