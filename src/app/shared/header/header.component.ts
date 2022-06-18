import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Route} from '../../route.enum';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {take, takeUntil} from 'rxjs/operators';
import {UserService} from '../services/user.service';
import {Subject} from 'rxjs';
import {UserModel} from '../models/user.model.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnDestroy {
  user: UserModel | null = null;
  componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private readonly router: Router,
              private readonly httpClient: HttpClient,
              private readonly userService: UserService) {
    this.userService.user$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: (user: UserModel | null) => {
          this.user = user;
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  onHeaderClick(): void {
    this.router.navigate([Route.TimeEntries]);
  }

  onNewTimeEntryButtonClick(): void {
    this.router.navigate([Route.TimeEntry]);
  }

  goToTimeEntryTypes(): void {
    this.router.navigate([Route.TimeEntryTypes]);
  }

  onLoginButtonClick(): void {
    this.router.navigate([Route.Login]);
  }

  onRegisterButtonClick(): void {
    this.router.navigate([Route.Register]);

  }

  onLogOutButtonClick(): void {
    this.httpClient.get(`${environment.backendUrl}/logout`)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.userService.logoutUser();
          this.router.navigate([Route.Login]);
        }
      });
  }
}
