import {HomeComponent} from "../../../components/home/home.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {ArticlesComponent} from "../../../components/article/articles.component";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {ArticleService} from "../../../services/article.service";
import {FakeArticleService, FakeRouterService, FakeNavBarService} from "../spec.utils";
import {ArticleComponent} from "../../../components/article/article.component";
import {RouterService} from "../../../services/router.service";
import {UserChipComponent} from "../../../components/user/user.chip.component";
import {NavBarService} from "../../../services/navbar.service";
describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ArticlesComponent, ProfileImageDirective, ArticleComponent, UserChipComponent],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: RouterService, useClass: FakeRouterService},
        {provide: NavBarService, useClass: FakeNavBarService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should show the latest articles component', () => {
    let latestArticlesDebugElement = fixture.debugElement.query(By.css('latest-articles'));

    expect(latestArticlesDebugElement).not.toBeNull();
  });
});
