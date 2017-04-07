/**
 * Created by pengelkes on 02.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpDelete, httpGet, httpGetWithoutAuthorization, httpPost} from "./helper.service";
import {Http} from "@angular/http";
import {Team} from "../models/team";
import {Picture} from "../models/profile.picture";
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

  async findPicturesByTeam(team: Team) {
    if (team) {
      let data = await httpGet(`/teamPictures/${team.id}`, this.http);
      let pictureResponse = JSON.parse(JSON.stringify(data))._body;
      let pictureJson = JSON.parse(pictureResponse);
      team.teamPictures = Picture.getAll(pictureJson)
    }
  }

  async deletePicture(pictureId: number) {
    await httpDelete(`/teamPictures/${pictureId}`, this.http)
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

  async update(team: Team) {
    return httpPost(`/teams/${team.id}`, team, this.http);
  }

}
