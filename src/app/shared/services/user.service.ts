import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from '../models/user.model.interface';

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  readonly user$: Observable<UserModel | null> = this.userSubject.asObservable();

  isUserLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }

  isLoggedInUserAdministrator(): boolean {
    return this.userSubject.value?.role === 1;
  }

  getLoggedInUser(): UserModel {
    if (this.userSubject.value == null) {
      throw new Error('There is no user logged in.');
    }
    return this.userSubject.value;
  }

  loginUser(userModel: UserModel): void {
    this.userSubject.next(userModel);
  }

  logoutUser() {
    this.userSubject.next(null);
  }
}
