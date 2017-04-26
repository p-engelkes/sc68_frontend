/**
 * Created by pengelkes on 26.04.2017.
 */
import {Component, OnDestroy, OnInit} from "@angular/core";
import {Article} from "../../../models/article";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {PictureService} from "../../../services/picture.service";
import {Subscription} from "rxjs";
import {ArticleService} from "../../../services/article.service";
import {NavBarService} from "../../../services/navbar.service";
@Component({
  selector: 'article-component',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit, OnDestroy {
  id: number;
  article: Article;
  subscription: Subscription;

  constructor(private navBarService: NavBarService,
              private articleService: ArticleService,
              private pictureService: PictureService,
              private route: ActivatedRoute,
              private router: Router) {
    let snapshot = this.route.snapshot;
    this.id = +snapshot.params['id'];
  }

  async ngOnInit() {
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let urlParts = event.url.split("/");
        let id = +urlParts[urlParts.length - 1];
        if (id) {
          this.initArticleComponent(id);
        }
      }
    });

    await this.initArticleComponent(this.id);
  }

  private async initArticleComponent(id: number) {
    try {
      this.article = await this.articleService.findById(id);
      await this.pictureService.findPicturesByArticle(this.article);
      this.navBarService.changeTitle(this.article.title);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
