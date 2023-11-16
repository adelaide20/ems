import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }


  // get all the employees
  getAllEmployees() {
    return this.http.get(`${environment.SERVER_URL}` + '/api/list');
  }
}
