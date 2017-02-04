/**
 * Created by pengelkes on 30.12.2016.
 */
import {Component} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/Article";
@Component({
  selector: 'latest-articles',
  templateUrl: './latest.articles.component.html'
})
export class LatestArticlesComponent {
  articles: Article[];

  constructor(private articleService: ArticleService) {
    this.articles = articleService.findAll();
  }
}
