import {Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Route} from '../route.enum';
import {LoginFormControlName} from './models/login-form-control-name-enum';
import {UserModel} from '../shared/models/user.model.interface';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly loginFormControlName: typeof LoginFormControlName = LoginFormControlName;
  formGroup: FormGroup;
  error?: string;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly userService: UserService) {
    this.formGroup = new FormGroup({
      [LoginFormControlName.Username]: new FormControl<string | null>(null, [Validators.required]),
      [LoginFormControlName.Password]: new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)])
    });
  }

  login(): void {
    if (this.formGroup.invalid) {
      this.error = 'Form input is invalid.';
      return;
    }
    this.httpClient.post<UserModel>(`${environment.backendUrl}/${Route.Login}`, this.formGroup.value)
      .pipe(take(1))
      .subscribe({
        next: (loggedInUser: UserModel) => {
          this.router.navigate([Route.TimeEntries]);
          this.userService.loginUser(loggedInUser);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.error = 'Wrong username/password!';
          }
        }
      });
  }
}
