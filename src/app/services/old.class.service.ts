/**
 * Created by patrickengelkes on 10/03/2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithoutAuthorization} from "./helper.service";
import {OldClass} from "../models/old.class";
@Injectable()
export class OldClassService {
  constructor(private http: Http) {
  }

  async findAll() {
    let response = await httpGetWithoutAuthorization("/oldClasses", this.http);

    return OldClass.getAll(response);
  }

  async findAllWithTeams() {
    let response = await httpGetWithoutAuthorization("/oldClasses?teams=true", this.http);

    return OldClass.getAll(response);
  }

  async findAllWithTeamsAndArticles() {
    let response = await httpGetWithoutAuthorization("/oldClasses?articles=true", this.http);

    return OldClass.getAll(response);
  }
}
