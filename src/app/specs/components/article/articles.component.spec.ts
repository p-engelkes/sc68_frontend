import {ArticlesComponent} from "../../../components/article/articles.component";
import {async, ComponentFixture, fakeAsync, TestBed, tick} from "@angular/core/testing";
import {ArticleService} from "../../../services/article.service";
import {By} from "@angular/platform-browser";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {
  FakeActivatedRoute,
  fakeArticleOne,
  FakeArticleService,
  fakeArticleTwo,
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
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {NewArticleComponent} from "../../../components/article/new.article.component";
import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {EditTextAreaComponent} from "../../../components/ui/edit.textarea.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TeamService} from "../../../services/team.service";
import {OldClassService} from "../../../services/old.class.service";
import Spy = jasmine.Spy;
describe('Articles Component', () => {
  let comp: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let fakeActivatedRoute: FakeActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesComponent, ProfileImageDirective, ArticleComponent, UserChipComponent, NewArticleComponent,
        EditInputFieldComponent, EditTextAreaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: RouterService, useClass: FakeRouterService},
        {provide: NavBarService, useClass: FakeNavBarService},
        {provide: ActivatedRoute, useClass: FakeActivatedRoute},
        {provide: Router, useClass: FakeRouter},
        {provide: OldClassService, useClass: FakeOldClassService},
        {provide: TeamService, useClass: FakeTeamService}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    fakeActivatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    comp = fixture.componentInstance;
  });

  it('should show all articles if the route has no parameters', fakeAsync(() => {
    comp.articles = [fakeArticleOne, fakeArticleTwo];
    tick();
    fixture.detectChanges();

    let articleElements = fixture.debugElement.queryAll(By.css('article-component'));

    expect(articleElements.length).toBe(2);
  }));

  it('should show all articles of the team with the given id if the route has a team id', fakeAsync(() => {
    let urlSegment = new UrlSegment('team', null);
    fakeActivatedRoute.snapshot.url = [urlSegment];
    tick();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let articleElements = fixture.debugElement.queryAll(By.css('article-component'));

      expect(articleElements.length).toEqual(3);
    });
  }));
});
