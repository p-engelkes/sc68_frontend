/**
 * Created by pengelkes on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {httpGet, url} from "./helper.service";
import {LocalStorage} from "../helper/LocalStorage";
@Injectable()
export class LoginService {
  token: string;

  constructor(private http: Http) {
  }

  logIn(userName: string, password: string) {
    let tokenUrl = url + "/oauth/token?grant_type=password&client_id=sc68&username=" + userName + "&password=" + password;
    let headers = new Headers({'Authorization': 'Basic c2M2ODphZG1pbnBhc3M='});
    return this.http.get(tokenUrl, {headers: headers});
  }

  logOut() {
    LocalStorage.setToken('');
    LocalStorage.setCurrentUserName('');
    LocalStorage.setCurrentUserId('');
    LocalStorage.setLoggedIn(false);
  }

  verifyToken(email) {
    return httpGet("/security/verifyLogin/" + email, this.http);
  }

  isLoggedIn() {
    return LocalStorage.isLoggedIn();
  }
}
