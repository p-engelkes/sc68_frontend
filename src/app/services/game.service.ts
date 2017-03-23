import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithParametersAndWithoutAuthorization, Parameter} from "./helper.service";
@Injectable()
export class GameService {
  constructor(private http: Http) {
  }

  findByTeamAndType(teamId: number, gameType: string) {
    return httpGetWithParametersAndWithoutAuthorization("/games", this.http,
      new Parameter("teamId", teamId), new Parameter("gameType", gameType))
  }
}
