import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithParametersAndWithoutAuthorization, Parameter} from "./helper.service";
import {SeasonTableTeam} from "../models/season.table.team";
@Injectable()
export class SeasonTableTeamService {
  constructor(private http: Http) {
  }

  async findByTeam(teamId) {
    let response = await httpGetWithParametersAndWithoutAuthorization("/table", this.http, new Parameter("teamId", teamId));

    return SeasonTableTeam.getAll(response);
  }
}
