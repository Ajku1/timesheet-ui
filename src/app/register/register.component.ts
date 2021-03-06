import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {RegisterFormControlName} from './models/register-form-control-name-enum';
import {Router} from '@angular/router';
import {Route} from '../route.enum';
import {UserService} from '../shared/services/user.service';
import {UserModel} from '../shared/models/user.model.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  readonly registerFormControlName: typeof RegisterFormControlName = RegisterFormControlName;
  error?: string;
  formGroup: FormGroup;
  users: { name: string, id: string }[] = [];

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router,
              private readonly userService: UserService) {
    this.formGroup = new FormGroup({
      [RegisterFormControlName.Name]:
        new FormControl<string | null>(null, [Validators.required, Validators.minLength(8)]),
      [RegisterFormControlName.ManagerId]: new FormControl<string | null>(null, Validators.required),
      [RegisterFormControlName.Email]: new FormControl<string | null>(null, Validators.required),
      [RegisterFormControlName.Username]: new FormControl<string | null>(null, Validators.required),
      [RegisterFormControlName.Password]:
        new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    this.httpClient.get<{ name: string, id: string }[]>(`${environment.backendUrl}/users`)
      .pipe(take(1))
      .subscribe({
        next: (users: { name: string, id: string }[]) => {
          this.users = users;
        }
      });
  }

  register(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.httpClient.post<UserModel>(`${environment.backendUrl}/register`, this.formGroup.value)
      .pipe(take(1))
      .subscribe({
        next: (registeredUser: UserModel) => {
          this.userService.loginUser(registeredUser);
          this.router.navigate([Route.TimeEntries]);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.error = 'Email is already in use.';
          }
        }
      });

  }
}
