import {ComponentFixture, async, TestBed, fakeAsync} from "@angular/core/testing";
import {UserChipComponent} from "../../../components/user/user.chip.component";
import {RouterService} from "../../../services/router.service";
import {FakeRouterService, queryElement, user, clickOnElement} from "../spec.utils";
import {ProfileImageDirective} from "../../../directives/image.directive";
describe('User Chip Component', () => {
  let fixture: ComponentFixture<UserChipComponent>;
  let component: UserChipComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserChipComponent, ProfileImageDirective],
      providers: [
        {provide: RouterService, useClass: FakeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserChipComponent);
    component = fixture.componentInstance;
  });

  it('should not display the chip if the user was not set', () => {
    let chipDebugElement = queryElement('.chip', fixture);
    expect(chipDebugElement).toBeNull();
  });

  it('should display the chip if the user was set', () => {
    component.user = user;
    fixture.detectChanges();

    let chipDebugElement = queryElement('.chip', fixture);
    expect(chipDebugElement).not.toBeNull();
  });

  it('should show the user profile on chip click', fakeAsync(() => {
    component.user = user;
    fixture.detectChanges();
    spyOn(component, 'showUserProfile');

    clickOnElement('.chip', fixture);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.showUserProfile).toHaveBeenCalledWith(1);
    });
  }));

  it('should display the full name of the user', () => {
    component.user = user;
    fixture.detectChanges();

    let chipDebugElement = queryElement('.chip', fixture);
    expect(chipDebugElement.nativeElement.innerText).toBe('Patrick Engelkes');
  })
});
