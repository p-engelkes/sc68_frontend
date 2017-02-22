/**
 * Created by pengelkes on 30.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/Article";
import {NavBarService} from "../../services/navbar.service";
@Component({
  selector: 'latest-articles',
  templateUrl: './latest.articles.component.html'
})
export class LatestArticlesComponent extends OnInit {
  articles: Article[];

  ngOnInit(): void {
    this.articleService.findAll().subscribe(
      data => this.articles = Article.getArticlesFromRestResponse(data),
      error => console.log(error)
    );
  }

  constructor(private articleService: ArticleService,
              private navBarService: NavBarService) {
    super();
    this.navBarService.changeTitle("News");
  }
}
