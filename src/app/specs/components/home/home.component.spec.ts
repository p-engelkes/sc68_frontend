import {HomeComponent} from "../../../components/home/home.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {LatestArticlesComponent} from "../../../components/article/latest.articles.component";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {Article} from "../../../models/Article";
import {Observable} from "rxjs";
import {ArticleService} from "../../../services/article.service";
import {Router} from "@angular/router";
describe('Home Component', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let fakeArticleOne = Article.create().setTitle('1').setContent('Content 1');
  let fakeArticleTwo = Article.create().setTitle('2').setContent('Content 2');

  class FakeArticleService {
    findAll() {
      return [fakeArticleOne, fakeArticleTwo];
    }
  }

  class FakeRouter {
    navigate(commands: any[]) {
      return Observable.of(true)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, LatestArticlesComponent, ProfileImageDirective],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: Router, useClass: FakeRouter}
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
