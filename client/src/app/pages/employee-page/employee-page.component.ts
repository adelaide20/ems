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
   
  

    // Swal.fire({
    //   title: "Are you sure?",
    //   text: "You won't be able to revert this!",
    //   icon: "warning",
    //   showCancelButton: true,
    //   confirmButtonColor: "#3085d6",
    //   cancelButtonColor: "#d33",
    //   confirmButtonText: "Yes, delete it!"
    // }).then((result) => {
    //   if (result.isConfirmed) {
    // this.empserv.deleteEmployee(this.emp_id)
    //     Swal.fire({
    //       title: "Deleted!",
    //       text: "Your file has been deleted.",
    //       icon: "success"
    //     });
    //   }
    // });


  }

}
