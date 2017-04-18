/**
 * Created by pengelkes on 30.12.2016.
 */
import {EventEmitter, Injectable, Output} from "@angular/core";
import {Http} from "@angular/http";
import {
  httpGetWithoutAuthorization,
  httpGetWithParametersAndWithoutAuthorization,
  httpPost,
  Parameter
} from "./helper.service";
import {Article} from "../models/article";
@Injectable()
export class ArticleService {
  @Output() addArticleEvent: EventEmitter<Article> = new EventEmitter();

  constructor(private http: Http) {
  }

  async create(article: Article): Promise<any> {
    await httpPost("/articles", article, this.http);
  }

  async findAll() {
    let response = await httpGetWithoutAuthorization("/articles", this.http);

    return Article.getAll(response);
  }

  async findById(id: number) {
    let data = await httpGetWithoutAuthorization("/articles/" + id, this.http);
    let articleResponse = JSON.parse(JSON.stringify(data))._body;
    let articleJson = JSON.parse(articleResponse)

    return Article.get(articleJson);
  }

  async findAllByAuthor(authorId: number) {
    let response = await httpGetWithParametersAndWithoutAuthorization("/articles/filter", this.http, new Parameter("authorId", authorId));

    return Article.getAll(response);
  }

  async findAllByTeam(teamId: number) {
    let response = await httpGetWithParametersAndWithoutAuthorization("/articles/filter", this.http, new Parameter("teamId", teamId));

    return Article.getAll(response);
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
