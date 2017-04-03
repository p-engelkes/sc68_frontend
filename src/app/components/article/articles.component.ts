/**
 * Created by pengelkes on 30.12.2016.
 */
import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";
import {NavBarService} from "../../services/navbar.service";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {TeamService} from "../../services/team.service";
import {Team} from "../../models/team";
@Component({
  selector: 'articles-component',
  templateUrl: 'articles.component.html'
})
export class ArticlesComponent implements OnInit, OnDestroy {
  @Input()
  teamId: number;

  articles: Article[];
  subscription: Subscription;

  constructor(private articleService: ArticleService,
              private navBarService: NavBarService,
              private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamService) {
    this.navBarService.changeTitle("News");
  }

  async ngOnInit() {
    this.articleService.getAddArticleEvent()
      .subscribe(newArticle => this.articles.unshift(newArticle));

    if (this.teamId) {
      try {
        this.articles = await this.articleService.findAllByTeam(this.teamId);
      } catch (error) {
        console.log(error);
      }
    } else {
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

      let snapshot = this.route.snapshot;
      let id = +snapshot.params['id'];
      let urlSegment = this.route.snapshot.url;
      let path = "";
      if (urlSegment && urlSegment[0]) {
        path = this.route.snapshot.url[0].path;
      }

      this.findArticles(id, path);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private async findArticles(id: number, path: string) {
    if ((!id || !path) || path === 'home') {
      this.articles = await this.articleService.findAll();
      this.navBarService.changeTitle('News');
    }

    if (id && path === 'team') {
      try {
        this.articles = await this.articleService.findAllByTeam(id);
      } catch (error) {
        console.log(error);
      }

      try {
        let team = await this.teamService.findById(id);
        this.navBarService.changeTitle(team.name);
      } catch (error) {
        console.log(error);
      }
    }

    if (id && path === 'author') {
      try {
        this.articles = await this.articleService.findAllByAuthor(id);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
