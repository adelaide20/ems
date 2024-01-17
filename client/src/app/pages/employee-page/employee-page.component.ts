import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from 'src/app/interfaces/employees';
import { AlertService } from 'src/app/services/alert.service';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2'

declare const bootstrap: any;

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss']
})
export class EmployeePageComponent implements OnInit {


  employee: any;

  emp_id: any

  positions = [
    { value: 'developer', label: 'Developer' },
    { value: 'technician', label: 'Technician' },
    { value: 'tester', label: 'Tester' }
  ];



  constructor(private alert: AlertService, private empserv: EmployeesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.emp_id = this.route.snapshot.paramMap.get('emp_id') || '';

    this.empserv.getEmployeeById(this.emp_id).subscribe((data: any) => {
      this.employee = data[0]
    })

  }


  openModal() {
    const modalElement = document.getElementById('exampleModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
  }



  // ediit employee function
  editEmployee() {

     // user object
     let details = {
      // contactno: this.employee.value.contactno,
      // email: this.employee.value.email,
      position: this.employee.position,
      salary: this.employee.salary,
      // end_date: this.employee.value.end_date
    };


    this.empserv.updateEmployee(this.emp_id, details).subscribe((res:any)=>{
      console.log(res);
      this.alert.success(res.message)
    })

  }



  // delete employee function
  deleteEmployee() {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.empserv.deleteEmployee(this.emp_id).subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['private/dash'])
        })
        Swal.fire({
          title: "Deleted!",
          text: "Employee has been deleted.",
          icon: "success"
        });
      }

    });


  }

}
