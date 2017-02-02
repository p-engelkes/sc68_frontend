/**
 * Created by pengelkes on 02.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet} from "./helper.service";
import {Http} from "@angular/http";
import {Team} from "../models/team";
@Injectable()
export class TeamService {

  constructor(private http: Http) {
  }

  getAllTeams(): Team[] {
    httpGet("/teams", this.http).subscribe(
      data => {
        return Team.getTeamsFromJson(data);
      },
      error => {
        console.log(error);
      }
    );

    return [];
  }
}
