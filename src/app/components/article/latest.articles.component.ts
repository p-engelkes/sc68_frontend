/**
 * Created by pengelkes on 30.12.2016.
 */
import {Component} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/Article";
import {Router} from "@angular/router";
@Component({
  selector: 'latest-articles',
  templateUrl: './latest.articles.component.html'
})
export class LatestArticlesComponent {
  articles: Article[];

  constructor(private articleService: ArticleService,
              private router: Router) {
    this.articles = articleService.findAll();
  }

  showAuthorProfile(authorId: number) {
    this.router.navigate(['/user', authorId])
  }
}
