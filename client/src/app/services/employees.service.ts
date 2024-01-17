import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employees } from '../interfaces/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }


  // add an employee
  addEmployee(employee: Employees) {
    return this.http.post(`${environment.SERVER_URL}` + '/api/new', employee);
  }


  // add employee employement details
  addDetails(employee: Employees) {
    return this.http.post(`${environment.SERVER_URL}` + '/api/employ', employee);
  }


  // get all the employees
  getAllEmployees() {
    return this.http.get(`${environment.SERVER_URL}` + '/api/list');
  }


  // get employee by id
  getEmployeeById(emp_id: any) {
    return this.http.get(`${environment.SERVER_URL}` + '/api/one/' + emp_id)
  }

  // update employee
  updateEmployee(emp_id: any, employee:any){
    return this.http.put(`${environment.SERVER_URL}` + '/api/update/' + emp_id,  employee)
  }

  // delete employee
  deleteEmployee(emp_id: any) {
    return this.http.get(`${environment.SERVER_URL}` + '/api/remove/' + emp_id)
  }

}
