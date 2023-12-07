import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesService } from 'src/app/services/employees.service';
import { Employees } from '../../interfaces/employees';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() emp_id: any = '';
  employees: Employees[] = []  // variables holding all the employees


  searchTerm = '';

  constructor(private employeeServ: EmployeesService, private router:Router) { }

  ngOnInit(): void {
    // get all aployees
    this.employeeServ.getAllEmployees().subscribe((data:any)=>{
      this.employees = data
    })
  }


  // view employee details
  viewEmp(emp_id:any) {
    let url = 'private/employee/' + emp_id
    this.router.navigate([url])
  }

}
