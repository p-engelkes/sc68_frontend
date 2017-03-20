/**
 * Created by patrickengelkes on 10/03/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithoutAuthorization} from "./helper.service";
@Injectable()
export class OldClassService {
  constructor(private http: Http) {
  }

  findAllWithTeams() {
    return httpGetWithoutAuthorization("/oldClasses", this.http);
  }

  findAllWithTeamsAndArticles() {
    return httpGetWithoutAuthorization("/oldClasses?articles?=true", this.http);
  }
}
