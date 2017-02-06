/**
 * Created by pengelkes on 30.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/Article";
@Component({
  selector: 'latest-articles',
  templateUrl: './latest.articles.component.html'
})
export class LatestArticlesComponent extends OnInit {
  articles: Article[];

  ngOnInit(): void {
    this.articleService.findAll().subscribe(
      data => {
        this.articles = Article.getArticlesFromRestResponse(data);
        console.log(this.articles.length);
      },
      error => {
        console.log(error);
      }
    );
  }

  constructor(private articleService: ArticleService) {
    super();
  }
}
