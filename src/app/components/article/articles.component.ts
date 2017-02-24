/**
 * Created by pengelkes on 30.12.2016.
 */
import {Component, OnInit, OnDestroy} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/Article";
import {NavBarService} from "../../services/navbar.service";
import {ActivatedRoute, Router, NavigationStart} from "@angular/router";
import {Subscription} from "rxjs";
@Component({
  selector: 'latest-articles',
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles: Article[];
  routerSubscription = false;
  subscription: Subscription;

  ngOnInit(): void {
    if (!this.routerSubscription) {
      this.subscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          let url = event.url;
          let urlParts = url.split("/");
          let id = urlParts[urlParts.length - 1];
          let path = "";
          if (url.indexOf("team") != -1) {
            path = "team";
          } else if (url.indexOf("author") != -1) {
            path = "author";
          }

          this.findArticles(+id, path);
        }
      });
      this.routerSubscription = true;
    }

    let snapshot = this.route.snapshot;
    let id = +snapshot.params['id'];
    let urlSegment = this.route.snapshot.url;
    let path = "";
    if (urlSegment[0]) {
      path = this.route.snapshot.url[0].path;
    }

    this.findArticles(id, path);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private findArticles(id: number, path: string) {
    if (!id && !path) {
      this.articleService.findAll().subscribe(
        data => this.articles = Article.getArticlesFromRestResponse(data),
        error => console.log(error)
      );
    }

    if (id && path === 'team') {
      this.articleService.findAllByTeam(id).subscribe(
        data => {
          this.articles = Article.getArticlesFromRestResponse(data);
        },
        error => console.log(error)
      )
    }

    if (id && path === 'author') {
      this.articleService.findAllByAuthor(id).subscribe(
        data => this.articles = Article.getArticlesFromRestResponse(data),
        error => console.log(error)
      )
    }
  }

  constructor(private articleService: ArticleService,
              private navBarService: NavBarService,
              private route: ActivatedRoute,
              private router: Router) {
    this.navBarService.changeTitle("News");
  }
}
