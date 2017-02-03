import {EditUserProfileComponent} from "../../../components/user/edit.user.profile.component";
import {ComponentFixture, async, TestBed, fakeAsync} from "@angular/core/testing";
import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {
  FakeUserService,
  FakeDataService,
  FakeTeamService,
  FakeRouter,
  queryElement,
  setInputValue
} from "../spec.utils";
import {UserService} from "../../../services/user.service";
import {DataService} from "../../../services/data.service";
import {TeamService} from "../../../services/team.service";
import {Router} from "@angular/router";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {NgUploaderModule} from "ngx-uploader";
describe('Edit User Profile Component', () => {
  let component: EditUserProfileComponent;
  let fixture: ComponentFixture<EditUserProfileComponent>;
  let fakeUserService: FakeUserService;
  let fakeDataService: FakeDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditUserProfileComponent, EditInputFieldComponent],
      imports: [ReactiveFormsModule, NgUploaderModule],
      providers: [
        {provide: UserService, useClass: FakeUserService},
        {provide: DataService, useClass: FakeDataService},
        {provide: TeamService, useClass: FakeTeamService},
        {provide: Router, useClass: FakeRouter},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserProfileComponent);
    fakeUserService = fixture.debugElement.injector.get(UserService);
    fakeDataService = fixture.debugElement.injector.get(DataService);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('component layout', () => {
    it('should have 4 edit-input-fields', () => {
      let editInputFieldDebugElements = fixture.debugElement.queryAll(By.css('edit-input-field'));
      expect(editInputFieldDebugElements.length).toBe(4);
    });

    it('should have 2 select options', () => {
      let editInputFieldDebugElements = fixture.debugElement.queryAll(By.css('select'));
      expect(editInputFieldDebugElements.length).toBe(2);
    });

    it('should have 1 file field', () => {
      let fileFieldDebugElement = queryElement('.file-field', fixture);
      expect(fileFieldDebugElement).not.toBeNull();
    });

    it('should have a refresh button', () => {
      let refreshButtonDebugElement = queryElement('.btn', fixture);
      expect(refreshButtonDebugElement).not.toBeNull();
    });
  });

  describe('component logic', () => {
    // let passwordDebugElement = fixture.debugElement.query(By.css('#password'));
    // setInputValue(passwordDebugElement, 'password', fixture);
    it('should set the editUserFormValues according to the input fields', fakeAsync(() => {
      let firstNameDebugElement = queryElement('#firstName', fixture);
      setInputValue(firstNameDebugElement, 'firstName', fixture);

      let lastNameDebugElement = queryElement('#lastName', fixture);
      setInputValue(lastNameDebugElement, 'lastName', fixture);

      let emailFieldDebugElement = queryElement('#email', fixture);
      setInputValue(emailFieldDebugElement, 'email', fixture);

      let backNumberDebugElement = queryElement('#backNumber', fixture);
      setInputValue(backNumberDebugElement, '8', fixture);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.editUserForm.value.firstName).toBe('firstName');
        expect(component.editUserForm.value.lastName).toBe('lastName');
        expect(component.editUserForm.value.email).toBe('email');
        expect(component.editUserForm.value.backNumber).toBe('8');
      });
    }));

    it('should call the refresh action on Refresh-Button click with the given values',
      fakeAsync(() => {
        spyOn(component, 'updateUserProfile');

        let refreshButtonDebugElement = queryElement('.submit-btn', fixture);
        refreshButtonDebugElement.triggerEventHandler('click', null);

        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.updateUserProfile).toHaveBeenCalled();
        });
      }));
  });
});
