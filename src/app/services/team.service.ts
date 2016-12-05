/**
 * Created by pengelkes on 02.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet} from "./helper.service";
import {Http} from "@angular/http";
@Injectable()
export class TeamService {

  constructor(private http: Http) {
  }

  getAllTeams() {
    return httpGet("/teams", this.http);
  }
}
