/**
 * Created by pengelkes on 09.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpDelete, httpGet, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {Position, User} from "../models/user";
import {DataService} from "./data.service";
@Injectable()
export class UserService {

  constructor(private http: Http,
              private dataService: DataService) {
  }

  async findById(userId) {
    let response = await httpGet("/users/" + userId, this.http);
    return User.get(response, this.dataService);
  }

  async getAllPositions() {
    let response = await httpGet("/positions", this.http);
    return Position.getPositionsFromJson(response);
  }

  async update(currentUserId: number, user: User) {
    return httpPost("/users/" + currentUserId, user, this.http);
  }

  async deleteProfilePicture(id: number) {
    await httpDelete(`/user/${id}/profilePicture`, this.http);
  }
}
