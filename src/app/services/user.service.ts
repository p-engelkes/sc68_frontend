/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpGetWithoutAuthorization, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {User} from "../models/user";
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUser() {
    return httpGet("/user/profile", this.http);
  }

  getAllPositions() {
    return httpGetWithoutAuthorization("/positions", this.http);
  }

  update(currentUserId: number, user: User) {
    return httpPost("/user/" + currentUserId, user, this.http);
  }
}
