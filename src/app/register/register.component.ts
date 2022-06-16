import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {take} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formGroup: FormGroup;

  constructor(private readonly httpClient: HttpClient) {
    this.formGroup = new FormGroup<any>({
      'username': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  login(): void {
    console.log(this.formGroup.errors);
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
      this.httpClient.post(`${environment.backendUrl}/register`, this.formGroup.value)
        .pipe(take(1))
        .subscribe();
    }
  }

}
