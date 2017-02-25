import {ArticlesComponent} from "../../../components/article/articles.component";
import {ComponentFixture, TestBed, fakeAsync, tick, async} from "@angular/core/testing";
import {ArticleService} from "../../../services/article.service";
import {By} from "@angular/platform-browser";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {
  FakeArticleService,
  fakeArticleOne,
  fakeArticleTwo,
  FakeRouterService,
  FakeNavBarService,
  FakeActivatedRoute,
  FakeRouter
} from "../spec.utils";
import {ArticleComponent} from "../../../components/article/article.component";
import {RouterService} from "../../../services/router.service";
import {UserChipComponent} from "../../../components/user/user.chip.component";
import {NavBarService} from "../../../services/navbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import Spy = jasmine.Spy;
describe('Articles Component', () => {
  let comp: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticlesComponent, ProfileImageDirective, ArticleComponent, UserChipComponent],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: RouterService, useClass: FakeRouterService},
        {provide: NavBarService, useClass: FakeNavBarService},
        {provide: ActivatedRoute, useClass: FakeActivatedRoute},
        {provide: Router, useClass: FakeRouter}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    comp = fixture.componentInstance;
  });

  it('should show all articles', fakeAsync(() => {
    comp.articles = [fakeArticleOne, fakeArticleTwo];
    tick();
    fixture.detectChanges();

    let articleElements = fixture.debugElement.queryAll(By.css('article'));

    expect(articleElements.length).toBe(2);
  }));
});
