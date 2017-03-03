/**
 * Created by pengelkes on 30.12.2016.
 */
import {Injectable, Output, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {httpGetWithParameters, Parameter, httpPost, httpGetWithoutAuthorization} from "./helper.service";
import {Article} from "../models/Article";
@Injectable()
export class ArticleService {
  @Output() addArticleEvent: EventEmitter<Article> = new EventEmitter();

  constructor(private http: Http) {
  }

  create(article: Article) {
    return httpPost("/articles", article, this.http);
  }

  getAllTeamsWithAnArticle() {
    return httpGetWithoutAuthorization("/articles/distinct/team", this.http)
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

  addArticle(article: Article) {
    this.addArticleEvent.emit(article);
  }

  getAddArticleEvent() {
    return this.addArticleEvent;
  }
}
