/**
 * Created by pengelkes on 18.04.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Article} from "../models/article";
import {httpDelete, httpGet, httpGetWithoutAuthorization} from "./helper.service";
import {Picture} from "../models/profile.picture";
import {Team} from "../models/team";
@Injectable()
export class PictureService {

  constructor(private http: Http) {
  }

  async findPicturesByArticle(article: Article) {
    if (article) {
      let data = await httpGetWithoutAuthorization(`/articlePictures/${article.id}`, this.http);
      let pictureResponse = JSON.parse(JSON.stringify(data))._body;
      let pictureJson = JSON.parse(pictureResponse);
      article.articlePictures = Picture.getAll(pictureJson);
    }
  }

  async deleteArticlePicture(pictureId: number) {
    await httpDelete(`/articlePictures/${pictureId}`, this.http)
  }

  async findPicturesByTeam(team: Team) {
    if (team) {
      let data = await httpGet(`/teamPictures/${team.id}`, this.http);
      let pictureResponse = JSON.parse(JSON.stringify(data))._body;
      let pictureJson = JSON.parse(pictureResponse);
      team.teamPictures = Picture.getAll(pictureJson)
    }
  }

  async deleteTeamPicture(pictureId: number) {
    await httpDelete(`/teamPictures/${pictureId}`, this.http)
  }
}
