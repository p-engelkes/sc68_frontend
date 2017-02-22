import {LatestArticlesComponent} from "../../../components/article/latest.articles.component";
import {ComponentFixture, TestBed, fakeAsync, tick, async} from "@angular/core/testing";
import {ArticleService} from "../../../services/article.service";
import {By} from "@angular/platform-browser";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {FakeArticleService, fakeArticleOne, fakeArticleTwo, FakeRouterService, FakeNavBarService} from "../spec.utils";
import {ArticleComponent} from "../../../components/article/article.component";
import {RouterService} from "../../../services/router.service";
import {UserChipComponent} from "../../../components/user/user.chip.component";
import {NavBarService} from "../../../services/navbar.service";
import Spy = jasmine.Spy;
describe('Latest Articles Component', () => {
  let comp: LatestArticlesComponent;
  let fixture: ComponentFixture<LatestArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LatestArticlesComponent, ProfileImageDirective, ArticleComponent, UserChipComponent],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: RouterService, useClass: FakeRouterService},
        {provide: NavBarService, useClass: FakeNavBarService}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestArticlesComponent);
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
