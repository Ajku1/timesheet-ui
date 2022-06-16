import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Route} from '../route.enum';
import {LoginFormControlName} from './models/LoginFormControlName';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  readonly loginFormControlName: typeof LoginFormControlName = LoginFormControlName;
  formGroup: FormGroup;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router) {
    this.formGroup = new FormGroup<any>({
      [LoginFormControlName.Username]: new FormControl(null, [Validators.required]),
      [LoginFormControlName.Password]: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
    this.httpClient.get(`${environment.backendUrl}/${Route.Users}`)
      .subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  login(): void {
    console.log(this.formGroup.errors);
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.httpClient.post(`${environment.backendUrl}/${Route.Login}`, this.formGroup.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigate([Route.Home]);
          },
          error: (error) => {
            console.log(error);
          }
        });
    }
  }
}
