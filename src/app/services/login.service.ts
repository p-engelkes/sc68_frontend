/**
 * Created by pengelkes on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {httpGet, url} from "./helper.service";
import {LocalStorage} from "../helper/LocalStorage";
import {User} from "../models/user";
@Injectable()
export class LoginService {
  token: string;

  constructor(private http: Http) {
  }

  async logIn(userName: string, password: string) {
    let tokenUrl = url + "/oauth/token?grant_type=password&client_id=sc68&username=" + userName + "&password=" + password;
    let headers = new Headers({'Authorization': 'Basic c2M2ODphZG1pbnBhc3M='});
    let data = await this.http.get(tokenUrl, {headers: headers}).toPromise();

    console.log(data);
    let responseBody = JSON.parse(JSON.stringify(data))._body;
    let response = JSON.parse(responseBody);
    let accessToken = response.access_token;
    LocalStorage.setToken(accessToken);

  }

  logOut() {
    LocalStorage.setToken('');
    LocalStorage.setCurrentEmail('');
    LocalStorage.setCurrentUserId('');
    LocalStorage.setCurrentUserName('');
    LocalStorage.setLoggedIn(false);
    LocalStorage.setArticleWriter(false);
  }

  async verifyToken(email) {
    let data = await httpGet("/security/verifyLogin/" + email, this.http);

    let response = JSON.parse(JSON.stringify(data))._body;
    let user = User.deserialize(JSON.parse(response));
    LocalStorage.setCurrentUserId(user.id + "");
    LocalStorage.setCurrentUserName(user.getFullName());
    LocalStorage.setCurrentEmail(email);
    LocalStorage.setLoggedIn(true);
    LocalStorage.setArticleWriter(user.articleWriter);
  }

  isLoggedIn() {
    return LocalStorage.isLoggedIn();
  }
}
