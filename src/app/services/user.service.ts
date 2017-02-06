/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {User} from "../models/user";
@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUser(userId) {
    return httpGet("/users/" + userId, this.http);
  }

  getAllPositions() {
    return httpGet("/positions", this.http);
  }

  update(currentUserId: number, user: User) {
    return httpPost("/users/" + currentUserId, user, this.http);
  }
}
