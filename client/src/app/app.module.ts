import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrivatePagesComponent } from './layout/private-pages/private-pages.component';
import { DashboardPagesComponent } from './pages/dashboard-pages/dashboard-pages.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HeaderComponent } from './ui/header/header.component';
import { ListComponent } from './ui/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { SearchComponent } from './ui/search/search.component';
import { SearchPipe } from './pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PrivatePagesComponent,
    DashboardPagesComponent,
    EmployeePageComponent,
    HeaderComponent,
    ListComponent,
    CreateComponent,
    SearchComponent,
    NotfoundPageComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
