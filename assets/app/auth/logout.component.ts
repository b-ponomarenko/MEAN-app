import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'my-logout',
  template: `
        <section class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </section>
    `
})
export class LogoutComponent {
  constructor(private _authService: AuthService, private _router: Router) {}

  onLogout() {
    this._authService.logOut();
    this._router.navigateByUrl('/auth/signin');
  }
}