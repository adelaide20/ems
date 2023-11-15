import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authserv: AuthService, private alert: AlertService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (!this.loginForm.valid) {
      this.alert.error('All fileds are required');
      return;
    }

    // user object
    let user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authserv.login(user).subscribe((data: any) => {

      if (data.message === "Signed in successfully!") {

        this.router.navigate(['private/dash'])

        this.authserv.storeUser(data);
        this.alert.success(`Welcome ${data.name}`);

      } else {
        this.alert.error(data.message);
        return;
      }

    })
  }

  
}
