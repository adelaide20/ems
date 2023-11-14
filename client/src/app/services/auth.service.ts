import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo?:User;

  constructor(private http: HttpClient) { }


  login(user: User){
    return this.http.post(`${environment.SERVER_URL}` + '/auth/login', user);
  }

  storeUser(user:User){
    localStorage.setItem('user', JSON.stringify(user))
   }
  
   getUser(){
    if(localStorage.getItem('user')){
      this.userInfo = JSON.parse(localStorage.getItem('user') || '')
    }
    return this.userInfo
   }

   logout(){
    localStorage.clear();
   }
}
