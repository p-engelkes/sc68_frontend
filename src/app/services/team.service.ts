/**
 * Created by pengelkes on 02.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet, httpGetWithoutAuthorization, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {Team} from "../models/team";
@Injectable()
export class TeamService {

  constructor(private http: Http) {
  }

  async getAllTeams() {
    let response = await httpGet("/teams", this.http);
    return Team.getAll(response);
  }

  async findById(id: number) {
    let data = await httpGet("/teams/" + id, this.http);
    let teamResponse = JSON.parse(JSON.stringify(data))._body;
    let teamJson = JSON.parse(teamResponse);

    return Team.get(teamJson);
  }

  async findAllPlayersByTeam(id: number) {
    return httpGetWithoutAuthorization("/teams/" + id + "/players", this.http);
  }

  async add(team: Team) {
    let data = await httpPost("/teams", team, this.http);
    let teamResponse = JSON.parse(JSON.stringify(data))._body;
    let teamJson = JSON.parse(teamResponse);

    return Team.get(teamJson);
  }
}
