import {Component, Input} from "@angular/core";
import {Article} from "../../models/article";
@Component({
  selector: 'article-component',
  templateUrl: './article.component.html'
})
export class ArticleComponent {
  @Input()
  article: Article;
}
