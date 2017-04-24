import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Field, FormValidators} from "../../validators";
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";
import {LocalStorage} from "../../helper/LocalStorage";
import {OldClass} from "../../models/old.class";
import {OldClassService} from "../../services/old.class.service";
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'manage-article-component',
  templateUrl: './manage.article.component.html'
})
export class ManageArticleComponent implements OnInit {
  newArticleForm: FormGroup;
  titleField: Field;
  contentField: Field;
  showForm: boolean = false;
  oldClasses: OldClass[];

  async ngOnInit() {
    try {
      this.oldClasses = await this.oldClassService.findAllWithTeams();
      this.newArticleForm.controls['team'].setValue(this.oldClasses[0].teams[0].id)
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private oldClassService: OldClassService) {
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

  abort() {
    this.showForm = false;
  }

  isArticleWriter() {
    return LocalStorage.isArticleWriter();
  }

  updateTeamId(newValue: number) {
    this.newArticleForm.controls['team'].setValue(newValue);
  }

  async createArticle(value: any) {
    let title = value.title;
    let content = value.content;
    let teamId = value.team;

    let article = new Article();
    article.title = title;
    article.content = content;
    article.authorId = LocalStorage.getCurrentUserId();
    article.teamId = teamId;
    article.created = new Date();

    try {
      await this.articleService.create(article);
      Materialize.toast('Artikel veröffentlicht', 4000);
      this.articleService.addArticle(article);
      this.newArticleForm = this.formBuilder.group({
        title: [null, Validators.required],
        content: [null, Validators.required],
        team: []
      });
      this.showForm = false;
    } catch (err) {
      Materialize.toast('Fehler beim Erstellen des Artikels', 4000);
    }
  }
}
