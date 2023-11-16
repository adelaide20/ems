import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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


  constructor() { }

  ngOnInit(): void {
  }
  currentStep: number = 1;

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

}
