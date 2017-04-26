import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Field, FormValidators} from "../../../validators";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../models/article";
import {LocalStorage} from "../../../helper/LocalStorage";
import {OldClass} from "../../../models/old.class";
import {OldClassService} from "../../../services/old.class.service";
import {FormAction} from "../../ui/FormEnums";
import {ActivatedRoute, Router} from "@angular/router";
import {NavBarService} from "../../../services/navbar.service";
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'manage-article-component',
  templateUrl: './manage.article.component.html'
})
export class ManageArticleComponent implements OnInit {
  manageArticleForm: FormGroup;
  titleField: Field;
  contentField: Field;
  oldClasses: OldClass[];
  private currentArticle: Article;
  private formAction: FormAction;

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private navBarService: NavBarService,
              private router: Router,
              private route: ActivatedRoute,
              private oldClassService: OldClassService) {
  }

  async ngOnInit() {
    this.oldClasses = await this.oldClassService.findAllWithTeams();
    let snapshot = this.route.snapshot.parent;
    if (snapshot && snapshot.params['id']) {
      this.formAction = FormAction.EDIT;
      this.navBarService.changeTitle('Artikel bearbeiten');
      this.currentArticle = await this.articleService.findById(+snapshot.params['id']);
      this.manageArticleForm = this.formBuilder.group({
        title: [this.currentArticle.title, Validators.required],
        content: [this.currentArticle.content, Validators.required],
        team: [this.currentArticle.teamId]
      });
    } else {
      this.formAction = FormAction.ADD;
      this.navBarService.changeTitle('Artikel hinzufügen');
      this.manageArticleForm = this.formBuilder.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        team: ['']
      });
      this.manageArticleForm.controls['team'].setValue(this.oldClasses[0].teams[0].id)
    }

    this.titleField = Field.create()
      .setControl(this.manageArticleForm.controls['title'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages([
        "Der Titel muss angegeben werden"
      ])
      .setId('title').setType('text').setFormControlName('title').setPlaceHolder('Titel').setShouldValidate(true)
      .setIsMandatory(true);

    this.contentField = Field.create()
      .setControl(this.manageArticleForm.controls['content'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages([
        "Der Inhalt muss angegeben werden"
      ])
      .setId('content').setFormControlName('content').setPlaceHolder('Inhalt').setShouldValidate(true).setIsMandatory(true);
  }

  isArticleWriter() {
    return LocalStorage.isArticleWriter();
  }

  updateTeamId(newValue: number) {
    this.manageArticleForm.controls['team'].setValue(newValue);
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
      if (this.manageArticleForm.valid) {
        let id = null;
        if (this.formAction == FormAction.EDIT) {
          article.id = this.currentArticle.id;
          await this.articleService.update(article);
          id = this.currentArticle.id;
          Materialize.toast('Artikel bearbeitet', 4000);
        } else {
          let createdArticle = await this.articleService.add(article);
          id = createdArticle.id;
          Materialize.toast('Artikel veröffentlicht', 4000);
        }

        this.router.navigate(['/articles', id]);
      }
    } catch (e) {
      Materialize.toast('Fehler beim Bearbeiten des Artikels');
    }
  }
}
