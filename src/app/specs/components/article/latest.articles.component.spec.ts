import {LatestArticlesComponent} from "../../../components/article/latest.articles.component";
import {ComponentFixture, TestBed, fakeAsync, tick, async} from "@angular/core/testing";
import {ArticleService} from "../../../services/article.service";
import {Article} from "../../../models/Article";
import {By} from "@angular/platform-browser";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;
describe('Latest Articles Component', () => {
  let comp: LatestArticlesComponent;
  let fixture: ComponentFixture<LatestArticlesComponent>;
  let articleService: ArticleService;
  let spy: Spy;
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
      declarations: [LatestArticlesComponent, ProfileImageDirective],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: Router, useClass: FakeRouter}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestArticlesComponent);
    comp = fixture.componentInstance;

    articleService = fixture.debugElement.injector.get(ArticleService);
  });

  it('should show all articles', fakeAsync(() => {
    comp.articles = [fakeArticleOne, fakeArticleTwo];
    tick();
    fixture.detectChanges();

    let articleElements = fixture.debugElement.queryAll(By.css('.article'));

    expect(articleElements.length).toBe(2);
  }));

  it('should not show a card-action if there is no author for the article', fakeAsync(() => {
    comp.articles = [fakeArticleOne, fakeArticleTwo];
    tick();
    fixture.detectChanges();

    let cardActionElement = fixture.debugElement.query(By.css('.card-action'));

    expect(cardActionElement).toBeNull();
  }));

});
