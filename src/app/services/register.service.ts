/**
 * Created by pengelkes on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Http} from "@angular/http";
import {httpPostWithoutAuthorization} from "./helper.service";
@Injectable()
export class RegisterService {

  constructor(private http: Http) {
  }

  register(user: User) {
    return httpPostWithoutAuthorization("/user/register", user, this.http);
  }
}
