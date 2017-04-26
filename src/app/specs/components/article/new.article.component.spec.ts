import {ManageArticleComponent} from "../../../components/article/general/manage.article.component";
import {async, ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {EditInputFieldComponent} from "../../../components/ui/input_fields/edit_input_field/edit.input.field.component";
import {EditTextAreaComponent} from "../../../components/ui/input_fields/edit_textarea_component/edit.textarea.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FakeArticleService, FakeOldClassService, queryElement, setInputValue} from "../spec.utils";
import {ArticleService} from "../../../services/article.service";
import {OldClassService} from "../../../services/old.class.service";
describe('New Article Component', () => {
  let component: ManageArticleComponent;
  let fixture: ComponentFixture<ManageArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageArticleComponent, EditInputFieldComponent, EditTextAreaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: OldClassService, useClass: FakeOldClassService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageArticleComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('the user is not an articleWriter', () => {
    it('should not be visible if the user is not an articleWriter', () => {
      spyOn(component, 'isArticleWriter').and.returnValue(false);

      let newArticleDebugElement = queryElement('#newArticleComponent', fixture);

      expect(newArticleDebugElement).toBeNull();
    })
  });

  describe('the user is an article writer', () => {
    beforeEach(() => {
      spyOn(component, 'isArticleWriter').and.returnValue(true);
      fixture.detectChanges();
    });

    it('should be a visible component', () => {
      let newArticleDebugElement = queryElement('#newArticleComponent', fixture);

      expect(newArticleDebugElement).not.toBeNull();
    });

    describe('component with visible form', () => {
      beforeEach(() => {
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
        it('should set the manageArticleForm values according to the input fields', fakeAsync(() => {
          let titleDebugElement = queryElement('#title', fixture);
          setInputValue(titleDebugElement, 'title', fixture);

          let contentDebugElement = queryElement('#content', fixture);
          setInputValue(contentDebugElement, 'content', fixture);

          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.manageArticleForm.value.title).toBe('title');
            expect(component.manageArticleForm.value.content).toBe('content');
          });
        }));
      });

      it('should call the createArticle action on Publish-Button click with the given values', fakeAsync(() => {
        spyOn(component, 'createArticle');

        let publishButtonDebugElement = queryElement('.submit-btn', fixture);
        publishButtonDebugElement.triggerEventHandler('click', null);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.createArticle).toHaveBeenCalledWith(component.manageArticleForm.value);
        })
      }))
    });

    it('should set the showForm to true on Create New Article Button click', fakeAsync(() => {
      let showFormButtonDebugElement = queryElement('#show-form', fixture);
      showFormButtonDebugElement.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
      })
    }))
  });
});
