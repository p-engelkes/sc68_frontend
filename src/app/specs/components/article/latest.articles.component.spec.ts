import {LatestArticlesComponent} from "../../../components/article/latest.articles.component";
import {ComponentFixture, TestBed, fakeAsync, tick, async} from "@angular/core/testing";
import {ArticleService} from "../../../services/article.service";
import {By} from "@angular/platform-browser";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {Router} from "@angular/router";
import {FakeArticleService, FakeRouter, fakeArticleOne, fakeArticleTwo} from "../spec.utils";
import Spy = jasmine.Spy;
describe('Latest Articles Component', () => {
  let comp: LatestArticlesComponent;
  let fixture: ComponentFixture<LatestArticlesComponent>;

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
