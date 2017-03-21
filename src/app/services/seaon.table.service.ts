import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithParametersAndWithoutAuthorization, Parameter} from "./helper.service";
@Injectable()
export class SeasonTableTeamService {
  constructor(private http: Http) {
  }

  findByTeam(teamId) {
    return httpGetWithParametersAndWithoutAuthorization("/table", this.http, new Parameter("teamId", teamId));
  }
}
