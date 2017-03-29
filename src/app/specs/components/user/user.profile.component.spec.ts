import {UserProfileComponent} from "../../../components/user/user.profile.component";
import {ComponentFixture, async, TestBed, tick, fakeAsync} from "@angular/core/testing";
import {PropertyComponent} from "../../../components/ui/property.component";
import {UserService} from "../../../services/user.service";
import {
  FakeUserService, FakeRouter, queryElement, FakeActivatedRoute, FakeDataService,
  FakeNavBarService, queryAll
} from "../spec.utils";
import {Router, ActivatedRoute} from "@angular/router";
import {ProfileImageDirective} from "../../../directives/image.directive";
import {By} from "@angular/platform-browser";
import {DataService} from "../../../services/data.service";
import {NavBarService} from "../../../services/navbar.service";
describe('User Component', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent, PropertyComponent, ProfileImageDirective],
      providers: [
        {provide: UserService, useClass: FakeUserService},
        {provide: Router, useClass: FakeRouter},
        {provide: ActivatedRoute, useClass: FakeActivatedRoute},
        {provide: DataService, useClass: FakeDataService},
        {provide: NavBarService, useClass: FakeNavBarService}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should display the user profile', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let userProfileDebugElement = queryElement('.user-profile', fixture);
      expect(userProfileDebugElement).not.toBeNull();
    });
  }));

  it('should display 6 properties', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let properties = queryAll('property', fixture);
      expect(properties.length).toBe(6);
    });
  }));

  describe('edit button', () => {

    it('should show the edit button if the user profile is that of the current user', async(() => {
      spyOn(component, 'isCurrentUser').and.returnValue(true);

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let editButtonDebugElement = queryElement('.btn', fixture);
        expect(editButtonDebugElement).not.toBeNull();
      });
    }));

    it('should not show the edit button if the user profile is from a different user', async(() => {
      spyOn(component, 'isCurrentUser').and.returnValue(false);

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let editButtonDebugElement = queryElement('.btn', fixture);
        expect(editButtonDebugElement).toBeNull();
      });
    }));
  });
});
