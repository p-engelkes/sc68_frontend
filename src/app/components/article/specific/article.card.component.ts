import {Component, Input, OnInit} from "@angular/core";
import {Article} from "../../../models/article";
import {Picture} from "../../../models/profile.picture";
import {RouterService} from "../../../services/router.service";
import {PictureService} from "../../../services/picture.service";
@Component({
  selector: 'article-card-component',
  templateUrl: './article.card.component.html'
})
export class ArticleCardComponent implements OnInit {
  @Input()
  article: Article;

  picture: Picture;

  constructor(private routerService: RouterService,
              private pictureService: PictureService) {
  }

  async ngOnInit() {
    await this.pictureService.findPicturesByArticle(this.article);
    if (this.article.pictures && this.article.pictures.length > 0) {
      let pictureNumber = Math.floor(Math.random() * this.article.pictures.length);
      this.picture = this.article.pictures[pictureNumber];
    }
  }

  getShortenedArticleContent() {
    if (this.article.content.length > 1000) {
      let content = this.article.content.substr(0, 1000);
      content += "...";
      return content;
    }

    return this.article.content;
  }
}
