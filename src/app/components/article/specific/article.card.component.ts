import {Component, Input} from "@angular/core";
import {Article} from "../../../models/article";
@Component({
  selector: 'article-card-component',
  templateUrl: './article.card.component.html'
})
export class ArticleCardComponent {
  @Input()
  article: Article;
}
