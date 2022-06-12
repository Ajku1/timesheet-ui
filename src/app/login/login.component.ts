import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Route} from '../route.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup: FormGroup;

  constructor(private readonly httpClient: HttpClient,
              private readonly router: Router) {
    this.formGroup = new FormGroup<any>({
      'username': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  login(): void {
    console.log(this.formGroup.errors);
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.httpClient.post(`${environment.backendUrl}/${Route.Login}`, this.formGroup.value)
        .pipe(take(1))
        .subscribe(() => this.router.navigate([Route.Home]));
    }
  }
}
