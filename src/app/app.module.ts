import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {Route} from './route.enum';

export const appStates: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: Route.Login,
    component: LoginComponent,
  },
  {
    path: Route.Register,
    component: RegisterComponent,
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appStates)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
