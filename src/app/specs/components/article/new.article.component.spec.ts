import {NewArticleComponent} from "../../../components/article/new.article.component";
import {ComponentFixture, async, TestBed, fakeAsync} from "@angular/core/testing";
import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {EditTextAreaComponent} from "../../../components/ui/edit.textarea.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FakeArticleService, FakeTeamService, queryElement, setInputValue} from "../spec.utils";
import {ArticleService} from "../../../services/article.service";
import {TeamService} from "../../../services/team.service";
fdescribe('New Article Component', () => {
  let component: NewArticleComponent;
  let fixture: ComponentFixture<NewArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewArticleComponent, EditInputFieldComponent, EditTextAreaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: TeamService, useClass: FakeTeamService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArticleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component with visible form', () => {
    beforeEach(() => {
      component.showForm = true;
      fixture.detectChanges();
    });

    describe('component layout', () => {
      it('should have a title input field', () => {
        let titleFieldDebugElement = queryElement('#title', fixture);
        expect(titleFieldDebugElement).not.toBeNull();
        expect(titleFieldDebugElement.nativeElement.type).toEqual('text');
      });

      it('should have a content textarea', () => {
        let contentDebugElement = queryElement('#content', fixture);
        expect(contentDebugElement).not.toBeNull();
        expect(contentDebugElement.nativeElement.type).toEqual('textarea');
      });

      it('should have a team dropdown', () => {
        let teamDebugElement = queryElement('#team', fixture);
        expect(teamDebugElement).not.toBeNull();
        expect(teamDebugElement.nativeElement.type).toEqual('select-one');
      });
    });

    describe('component logic', () => {
      it('should set the newArticleForm values according to the input fields', fakeAsync(() => {
        let titleDebugElement = queryElement('#title', fixture);
        setInputValue(titleDebugElement, 'title', fixture);

        let contentDebugElement = queryElement('#content', fixture);
        setInputValue(contentDebugElement, 'content', fixture);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.newArticleForm.value.title).toBe('title');
          expect(component.newArticleForm.value.content).toBe('content');
        });
      }));
    });

    it('should call the createArticle action on Publish-Button click with the given values', fakeAsync(() => {
      spyOn(component, 'createArticle');

      let publishButtonDebugElement = queryElement('.submit-btn', fixture);
      publishButtonDebugElement.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.createArticle).toHaveBeenCalledWith(component.newArticleForm.value);
      })
    }))
  });

  it('should set the showForm to true on Create New Article Button click', fakeAsync(() => {
    expect(component.showForm).toBeFalsy();
    let showFormButtonDebugElement = queryElement('#show-form', fixture);
    showFormButtonDebugElement.triggerEventHandler('click', null);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.showForm).toBeTruthy();
    })
  }))
});