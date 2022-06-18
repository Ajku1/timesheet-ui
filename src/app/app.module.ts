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
import {TimeEntryComponent} from './time-entries/time-entry/time-entry.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {AuthenticationGuard} from './shared/guards/authentication.guard';
import {TimeEntryTypesComponent} from './time-entry-types/time-entry-types.component';
import {AdministratorGuard} from './shared/guards/administrator.guard';
import { TimeEntryTypeComponent } from './time-entry-types/time-entry-type/time-entry-type.component';

export const appStates: Routes = [
  {
    path: '',
    component: TimeEntriesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: '',
    component: LoginComponent
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
    path: Route.TimeEntry,
    component: TimeEntryComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: Route.TimeEntries,
    component: TimeEntriesComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: Route.TimeEntryTypes,
    component: TimeEntryTypesComponent,
    canActivate: [AdministratorGuard]
  },
  {
    path: `${Route.TimeEntryType}/:id`,
    component: TimeEntryTypeComponent,
    canActivate: [AdministratorGuard]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    TimeEntriesComponent,
    TimeEntryComponent,
    TimeEntryTypesComponent,
    TimeEntryTypeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appStates),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
