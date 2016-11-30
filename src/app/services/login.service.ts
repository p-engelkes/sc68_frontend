/**
 * Created by pengelkes on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
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
    console.log("Logout called");
  }

  verifyToken(token) {
    let tokenUrl = "http://localhost:8080/api/security/verifyLogin";
    let headers = new Headers({'Authorization': 'Bearer' + token});
    return this.http.get(tokenUrl, {headers: headers});
  }

  isLoggedIn() {
    console.log(localStorage.getItem('isLoggedIn'));
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
