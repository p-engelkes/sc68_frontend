import {Component} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Field, FormValidators} from "../../validators";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/Article";
import {LocalStorage} from "../../helper/LocalStorage";
import {OldClass} from "../../models/old.class";
import {OldClassService} from "../../services/old.class.service";
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'new-article-component',
  templateUrl: 'new.article.component.html'
})
export class NewArticleComponent {
  newArticleForm: FormGroup;
  titleField: Field;
  contentField: Field;
  showForm: boolean = false;
  oldClasses: OldClass[];

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private oldClassService: OldClassService) {
    this.oldClassService.findAllWithTeams().subscribe(
      data => this.oldClasses = OldClass.getOldClassesFromJson(data),
      error => console.log(error)
    );

    this.newArticleForm = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.required],
      team: []
    });

    this.titleField = Field.create()
      .setControl(this.newArticleForm.controls['title'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages([
        "Der Titel muss angegeben werden"
      ])
      .setId('title').setType('text').setFormControlName('title').setPlaceHolder('Titel').setShouldValidate(true);

    this.contentField = Field.create()
      .setControl(this.newArticleForm.controls['content'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages([
        "Der Inhalt muss angegeben werden"
      ])
      .setId('content').setFormControlName('content').setPlaceHolder('Inhalt').setShouldValidate(true);
  }

  showCreateArticleForm() {
    this.showForm = true;
  }

  isArticleWriter() {
    return LocalStorage.isArticleWriter();
  }

  createArticle(value: any) {
    let title = value.title;
    let content = value.content;
    let teamId = jQuery('#team').val();

    let article = Article.create()
      .setTitle(title)
      .setContent(content)
      .setAuthorId(LocalStorage.getCurrentUserId())
      .setTeamId(teamId)
      .setCreated(new Date());

    this.articleService.create(article).subscribe(
      data => {
        Materialize.toast("Artikel veröffentlicht", 4000);
        this.articleService.addArticle(article);
        this.showForm = false
      },
      error => Materialize.toast("Fehler beim Erstellen des Artikels", 4000)
    );
  }
}
