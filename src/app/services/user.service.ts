/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {User} from "../models/user";
import {DataService} from "./data.service";
@Injectable()
export class UserService {

  constructor(private http: Http,
              private dataService: DataService) {
  }

  getUser(userId): User {
    httpGet("/users/" + userId, this.http).subscribe(
      data => {
        return User.getUserFromJsonResponse(data, this.dataService)
      },
      error => {
        console.log(error);
      }
    );

    return null;
  }

  getAllPositions() {
    return httpGet("/positions", this.http);
  }

  update(currentUserId: number, user: User) {
    return httpPost("/users/" + currentUserId, user, this.http);
  }
}
