/**
 * Created by pengelkes on 02.12.2016.
 */
import {Injectable} from "@angular/core";
import {httpGet} from "./helper.service";
@Injectable()
export class TeamService {
  getAllTeams() {
    return httpGet("/teams");
  }
}
