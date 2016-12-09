/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet} from "./helper.service";
import {Http} from "@angular/http";
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUser() {
    return httpGet("/user/profile", this.http);
  }
}
