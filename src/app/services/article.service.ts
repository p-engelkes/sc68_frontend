/**
 * Created by pengelkes on 30.12.2016.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithParameters, Parameter, httpPost, httpGetWithoutAuthorization} from "./helper.service";
import {Article} from "../models/Article";
@Injectable()
export class ArticleService {
  constructor(private http: Http) {
  }

  create(article: Article) {
    return httpPost("/articles", article, this.http);
  }

  findAll(): any {
    return httpGetWithoutAuthorization("/articles", this.http);
  }

  findAllByAuthor(authorId: number) {
    return httpGetWithParameters("/articles/filter", this.http, new Parameter("authorId", authorId));
  }

  findAllByTeam(teamId: number) {
    return httpGetWithParameters("/articles/filter", this.http, new Parameter("teamId", teamId));
  }

  update(articleId: number, article: Article) {
    return httpPost("/articles/" + articleId, article, this.http);
  }
}
