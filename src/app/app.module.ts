import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Route} from './route.enum';
import {TimeEntriesComponent} from './time-entries/time-entries.component';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';

export const appStates: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: Route.Login,
    component: LoginComponent
  },
  {
    path: Route.Register,
    component: RegisterComponent
  },
  {
    path: Route.TimeEntries,
    component: TimeEntriesComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    TimeEntriesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appStates)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
