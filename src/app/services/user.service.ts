/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpGetWithoutAuthorization, httpPostWithoutAuthorization} from "./helper.service";
import {Http} from "@angular/http";
import {User} from "../models/user";
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUser(userId) {
    return httpGet("/user/" + userId, this.http);
  }

  getAllPositions() {
    return httpGetWithoutAuthorization("/positions", this.http);
  }

  update(currentUserId: number, user: User) {
    return httpPostWithoutAuthorization("/user/" + currentUserId, user, this.http);
  }
}
