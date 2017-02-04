import {Component, Input} from "@angular/core";
import {Article} from "../../models/Article";
@Component({
  selector: 'article',
  templateUrl: './article.component.html'
})
export class ArticleComponent {
  @Input()
  article: Article;
}
