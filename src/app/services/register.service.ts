/**
 * Created by pengelkes on 30.11.2016.
 */
import {Injectable} from "@angular/core";
import {User} from "../models/user";
import {Headers, Http} from "@angular/http";
@Injectable()
export class RegisterService {

  constructor(private http: Http) {
  }

  register(user: User) {
    let url = "http://localhost:8080/user/register";
    let headers = new Headers({'Content-Type': 'application/json'});
    console.log(JSON.stringify(user));
    return this.http.post(url, JSON.stringify(user), {headers: headers})
  }
}
