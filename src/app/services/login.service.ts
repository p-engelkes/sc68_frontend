/**
 * Created by pengelkes on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {httpGet} from "./helper.service";
@Injectable()
export class LoginService {
  token: string;

  constructor(private http: Http) {
  }

  logIn(userName: string, password: string) {
    let tokenUrl = "http://localhost:8080/oauth/token?grant_type=password&client_id=sc68&username=" + userName + "&password=" + password;
    let headers = new Headers({'Authorization': 'Basic c2M2ODphZG1pbnBhc3M='});
    return this.http.get(tokenUrl, {headers: headers});
  }

  logOut() {
    localStorage.setItem('token', '');
    localStorage.setItem('currentUserName', '');
    localStorage.setItem('isLoggedIn', "false");
  }

  verifyToken(token) {
    return httpGet("/security/verifyLogin", this.http);
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
