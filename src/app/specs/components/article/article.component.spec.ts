import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {fakeArticleOne, fakeArticleTwo, FakeRouterService, queryElement} from "../spec.utils";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {UserChipComponent} from "../../../components/user/user.chip.component";
import {RouterService} from "../../../services/router.service";
import {ArticleComponent} from "../../../components/article/specific/article.component";
describe('Article Component', () => {
  let fixture: ComponentFixture<ArticleComponent>;
  let component: ArticleComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleComponent, ProfileImageDirective, UserChipComponent],
      providers: [
        {provide: RouterService, useClass: FakeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display nothing if the article was not set', () => {
    let articleDebugElement = queryElement('.article', fixture);
    expect(articleDebugElement).toBeNull();
  });

  it('should display the article title and content if the article was set', () => {
    component.article = fakeArticleOne;
    fixture.detectChanges();
    let articleDebugElement = queryElement('.article', fixture);
    expect(articleDebugElement).not.toBeNull();

    let cardTitleDebugElement = queryElement('.card-title', fixture);
    expect(cardTitleDebugElement.nativeElement.innerText).toBe('1');

    let cardContentDebugElement = queryElement('p', fixture);
    expect(cardContentDebugElement.nativeElement.innerText).toBe('Content 1');
  });

  it('should not have an action if the article has no author', () => {
    component.article = fakeArticleTwo;
    fixture.detectChanges();
    let cardActionDebugElement = queryElement('.card-action', fixture);
    expect(cardActionDebugElement).toBeNull();
  });

  it('should have an action if the article has an author', () => {
    component.article = fakeArticleOne;
    fixture.detectChanges();

    let cardActionDebugElement = queryElement('.card-action', fixture);
    expect(cardActionDebugElement).not.toBeNull();
  })
});
