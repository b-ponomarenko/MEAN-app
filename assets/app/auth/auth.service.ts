import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {User} from "./user";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()

export class AuthService {

  token: string;

  constructor(private _http: Http) {
    this.token = localStorage.getItem('token');
  }

  signUp(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-type': 'application/json'});
    return this._http.post('/users', body, { headers })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  signIn(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-type': 'application/json'});
    return this._http.post('/users/signin', body, { headers })
      .map(response => response.json())
      .catch(error => Observable.throw(error.json()));
  }

  logOut() {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
}