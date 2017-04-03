import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithParametersAndWithoutAuthorization, Parameter} from "./helper.service";
import {SeasonGame} from "../models/season.game";
@Injectable()
export class GameService {
  constructor(private http: Http) {
  }

  async findByTeamAndType(teamId: number, gameType: string) {
    let response = await httpGetWithParametersAndWithoutAuthorization("/games", this.http,
      new Parameter("teamId", teamId), new Parameter("gameType", gameType));

    return SeasonGame.getAll(response);
  }
}
