/**
 * Created by pengelkes on 02.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpGetWithoutAuthorization} from "./helper.service";
import {Http} from "@angular/http";
@Injectable()
export class TeamService {

  constructor(private http: Http) {
  }

  getAllTeams() {
    return httpGet("/teams", this.http);
  }

  findById(id: number) {
    return httpGet("/teams/" + id, this.http)
  }

  findAllPlayersByTeam(id: number) {
    return httpGetWithoutAuthorization("/teams/" + id + "/players", this.http);
  }
}
