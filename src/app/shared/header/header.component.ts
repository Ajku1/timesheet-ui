import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Route} from '../../route.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private readonly router: Router) {
  }


  onHeaderClick() {
    this.router.navigate([Route.TimeEntries]);
  }

  onNewTimeEntryButtonClick() {
    this.router.navigate([Route.TimeEntry]);
  }

  onLoginButtonClick() {
    this.router.navigate([Route.Login]);
  }

  onRegisterButtonClick() {
    this.router.navigate([Route.Register]);

  }

  onLogOutButtonClick() {

  }
}
