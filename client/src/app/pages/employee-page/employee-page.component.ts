import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employees } from 'src/app/interfaces/employees';
import { EmployeesService } from 'src/app/services/employees.service';
@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {


  employee: Employees | undefined;

  emp_id:any

  constructor(private empserv: EmployeesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.emp_id = this.route.snapshot.paramMap.get('emp_id') || '';

    this.empserv.getEmployeeById(this.emp_id).subscribe((data: any) => {
      this.employee = data[0]
      
      console.log(this.employee);
      
    })

  }



  deleteEmployee(){
    
  }

}
