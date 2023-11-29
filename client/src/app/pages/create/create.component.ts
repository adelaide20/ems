import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  emp_id: any;


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
        console.log(res.res[0].emp_id);
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

    const employee = JSON.parse(localStorage.getItem('employee') || '');

    // user object
    let employment = {
      emp_id: employee.res[0].emp_id,
      position: this.employmentForm.value.position,
      start_date: this.employmentForm.value.start_date,
      salary: this.employmentForm.value.salary
    };


    localStorage.setItem('details', JSON.stringify(employment));
    this.nextStep()
  }



  save(){

    const details = JSON.parse(localStorage.getItem('details') || '');

       this.empServ.addDetails(details).subscribe(
      (res: any) => {
        this.alert.success(res.message)
       
        console.log(res.res[0].emp_id);
        this.router.navigate(['private/dash'])
      },
      (error) => {
        this.alert.error(error.error.message)
      }

    )

  }
 
  
}
