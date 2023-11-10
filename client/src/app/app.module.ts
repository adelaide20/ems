import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PrivatePagesComponent } from './layout/private-pages/private-pages.component';
import { DashboardPagesComponent } from './pages/dashboard-pages/dashboard-pages.component';
import { EmployeePageComponent } from './pages/employee-page/employee-page.component';
import { HeaderComponent } from './ui/header/header.component';
import { ListComponent } from './ui/list/list.component';
import { CreateComponent } from './ui/create/create.component';
import { SearchComponent } from './ui/search/search.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';

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
    NotfoundPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
