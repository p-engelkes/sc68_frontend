import {HomeComponent} from "../../../components/home/home.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {ArticlesComponent} from "../../../components/article/articles.component";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {ArticleService} from "../../../services/article.service";
import {
  FakeActivatedRoute,
  FakeArticleService,
  FakeNavBarService,
  FakeOldClassService,
  FakeRouter,
  FakeRouterService,
  FakeTeamService
} from "../spec.utils";
import {ArticleComponent} from "../../../components/article/article.component";
import {RouterService} from "../../../services/router.service";
import {UserChipComponent} from "../../../components/user/user.chip.component";
import {NavBarService} from "../../../services/navbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NewArticleComponent} from "../../../components/article/new.article.component";
import {EditTextAreaComponent} from "../../../components/ui/edit.textarea.component";
import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TeamService} from "../../../services/team.service";
import {OldClassService} from "../../../services/old.class.service";
describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ArticlesComponent, ProfileImageDirective, ArticleComponent, UserChipComponent, NewArticleComponent,
        EditTextAreaComponent, EditInputFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: RouterService, useClass: FakeRouterService},
        {provide: NavBarService, useClass: FakeNavBarService},
        {provide: ActivatedRoute, useClass: FakeActivatedRoute},
        {provide: Router, useClass: FakeRouter},
        {provide: OldClassService, useClass: FakeOldClassService},
        {provide: TeamService, useClass: FakeTeamService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should show the latest articles component', () => {
    let latestArticlesDebugElement = fixture.debugElement.query(By.css('articles-component'));

    expect(latestArticlesDebugElement).not.toBeNull();
  });
});
