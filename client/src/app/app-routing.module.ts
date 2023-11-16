import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivatePagesComponent } from './layout/private-pages/private-pages.component';
import { DashboardPagesComponent } from './pages/dashboard-pages/dashboard-pages.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'private', component: PrivatePagesComponent, children: [
      { path: 'dash', component: DashboardPagesComponent },
      { path: 'employee/:emp_id', component: EmployeePageComponent },
      { path: '', redirectTo: '/dash', pathMatch: 'full' },
    ]
  },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
