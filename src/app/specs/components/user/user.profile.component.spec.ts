import {UserProfileComponent} from "../../../components/user/user.profile.component";
import {ComponentFixture, async, TestBed} from "@angular/core/testing";
import {PropertyComponent} from "../../../components/ui/property.component";
import {UserService} from "../../../services/user.service";
import {FakeUserService, FakeRouter, queryElement, FakeActivatedRoute} from "../spec.utils";
import {Router, ActivatedRoute} from "@angular/router";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {By} from "@angular/platform-browser";
describe('User Component', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent, PropertyComponent, ProfileImageDirective],
      providers: [
        {provide: UserService, useClass: FakeUserService},
        {provide: Router, useClass: FakeRouter},
        {
          provide: ActivatedRoute, useClass: FakeActivatedRoute
        }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
  });

  it('should display the user profile', () => {
    fixture.detectChanges();
    let userProfileDebugElement = queryElement('.user-profile', fixture);
    expect(userProfileDebugElement).not.toBeNull();
  });

  it('should display 3 properties', () => {
    fixture.detectChanges();
    let properties = fixture.debugElement.queryAll(By.css('property'));
    expect(properties.length).toBe(5);
  });

  describe('edit button', () => {

    it('should show the edit button if the user profile is that of the current user', () => {
      spyOn(component, 'isCurrentUser').and.returnValue(true);

      fixture.detectChanges();
      let editButtonDebugElement = queryElement('.btn', fixture);
      expect(editButtonDebugElement).not.toBeNull();
    });

    it('should not show the edit button if the user profile is from a different user', () => {
      spyOn(component, 'isCurrentUser').and.returnValue(false);

      fixture.detectChanges();
      let editButtonDebugElement = queryElement('.btn', fixture);
      expect(editButtonDebugElement).toBeNull();
    })
  });
});
