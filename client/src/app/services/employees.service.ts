import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employees } from '../interfaces/employees';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }


  // get all the employees
  getAllEmployees() {
    return this.http.get(`${environment.SERVER_URL}` + '/api/list');
  }


   // get all the employees
   addEmployee(employee: Employees){
    return this.http.post(`${environment.SERVER_URL}` + '/api/new', employee);
   }
}
