/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {Position, User} from "../models/user";
import {DataService} from "./data.service";
@Injectable()
export class UserService {

  constructor(private http: Http,
              private dataService: DataService) {
  }

  async getUser(userId) {
    let response = await httpGet("/players/" + userId, this.http);
    return User.get(response, this.dataService);
  }

  async getAllPositions() {
    let response = await httpGet("/positions", this.http);
    return Position.getPositionsFromJson(response);
  }

  update(currentUserId: number, user: User) {
    return httpPost("/players/" + currentUserId, user, this.http);
  }
}
