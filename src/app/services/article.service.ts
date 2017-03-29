/**
 * Created by pengelkes on 30.12.2016.
 */
import {Injectable, Output, EventEmitter} from "@angular/core";
import {Http} from "@angular/http";
import {
  Parameter,
  httpPost,
  httpGetWithoutAuthorization,
  httpGetWithParametersAndWithoutAuthorization
} from "./helper.service";
import {Article} from "../models/Article";
@Injectable()
export class ArticleService {
  @Output() addArticleEvent: EventEmitter<Article> = new EventEmitter();

  constructor(private http: Http) {
  }

  async create(article: Article): Promise<any> {
    await httpPost("/articles", article, this.http);
  }

  getAllTeamsWithAnArticle() {
    return httpGetWithoutAuthorization("/articles/distinct/team", this.http)
  }

  async findAll() {
    let response = await httpGetWithoutAuthorization("/articles", this.http);

    return Article.getArticlesFromRestResponse(response);
  }

  async findAllByAuthor(authorId: number) {
    let response = await httpGetWithParametersAndWithoutAuthorization("/articles/filter", this.http, new Parameter("authorId", authorId));

    return Article.getArticlesFromRestResponse(response);
  }

  async findAllByTeam(teamId: number) {
    let response = await httpGetWithParametersAndWithoutAuthorization("/articles/filter", this.http, new Parameter("teamId", teamId));

    return Article.getArticlesFromRestResponse(response);
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
