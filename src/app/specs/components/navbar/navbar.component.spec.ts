import {NavbarComponent} from "../../../components/navbar/navbar.component";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {LoginService} from "../../../services/login.service";
import {
  checkRouterNavigation,
  clickOnElement,
  FakeArticleService,
  FakeLoginService,
  FakeNavBarService,
  FakeOldClassService,
  FakeRegisterService,
  FakeRouter,
  FakeRouterService,
  queryElement
} from "../spec.utils";
import {By} from "@angular/platform-browser";
import {LoginComponent} from "../../../components/login/login.component";
import {RegisterComponent} from "../../../components/register/register.component";
import {Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {EditInputFieldComponent} from "../../../components/ui/input_fields/edit_input_field/edit.input.field.component";
import {RegisterService} from "../../../services/register.service";
import {RouterService} from "../../../services/router.service";
import {NavBarService} from "../../../services/navbar.service";
import {ArticleService} from "../../../services/article.service";
import {OldClassService} from "../../../services/old.class.service";
describe('Navbar Component', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let fakeLoginService: FakeLoginService;
  let fakeRouterService: FakeRouterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, LoginComponent, RegisterComponent, EditInputFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: LoginService, useClass: FakeLoginService},
        {provide: RegisterService, useClass: FakeRegisterService},
        {provide: NavBarService, useClass: FakeNavBarService},
        {provide: Router, useClass: FakeRouter},
        {provide: RouterService, useClass: FakeRouterService},
        {provide: ArticleService, useClass: FakeArticleService},
        {provide: OldClassService, useClass: FakeOldClassService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    fakeLoginService = fixture.debugElement.injector.get(LoginService);
    // fakeRouterService = fixture.debugElement.injector.get(RouterService);
    component = fixture.componentInstance;
  });

  it('should include the login and register modal components', () => {
    let loginDebugElement = fixture.debugElement.query(By.css('logIn'));
    expect(loginDebugElement).not.toBeNull();

    let registerDebugElement = fixture.debugElement.query(By.css('register'));
    expect(registerDebugElement).not.toBeNull();
  });

  it('should have a sidenav logo', () => {
    let sideNavLogoDebugElement = fixture.debugElement.query(By.css('#sidenav-logo'));
    expect(sideNavLogoDebugElement).not.toBeNull();
  });

  describe('user is logged in', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have a link to all teams', () => {
      let teamDebugElement = queryElement('#teams', fixture);
      expect(teamDebugElement).not.toBeNull();
    });

    describe('user menu', () => {
      it('should have a user menu if the user is logged in', () => {
        let userMenuDebugElement = queryElement('#user-menu', fixture);
        expect(userMenuDebugElement).not.toBeNull();
      });

      it('should have a link to the user profile', () => {
        let userProfileDebugElement = queryElement('#user-profile', fixture);
        expect(userProfileDebugElement).not.toBeNull();
      });

      it('should have a logout link', () => {
        let logoutDebugElement = queryElement('#logout', fixture);
        expect(logoutDebugElement).not.toBeNull();
      })
    });
  });

  describe('user is not logged in', () => {
    beforeEach(() => {
      spyOn(fakeLoginService, 'isLoggedIn').and.returnValue(false);
      fixture.detectChanges();
    });

    it('should have a login link', () => {
      let loginDebugElement = queryElement('#login', fixture);
      expect(loginDebugElement).not.toBeNull();
    });

    it('should have a register link', () => {
      let registerDebugElement = queryElement('#register', fixture);
      expect(registerDebugElement).not.toBeNull();
    });
  });

  describe('general menu', () => {
    it('should have an about us link', () => {
      let aboutUsDebugElement = queryElement('#about-us', fixture);
      expect(aboutUsDebugElement).not.toBeNull();
    });

    it('should have a contact link', () => {
      let contactDebugElement = queryElement('#contact', fixture);
      expect(contactDebugElement).not.toBeNull();
    });
  });

  describe('routing', () => {
    beforeEach(() => {
      spyOn(fakeRouterService, 'navigateTo');
    });

    it('should logout the user', () => {
      spyOn(component, 'logout');

      fixture.detectChanges();
      clickOnElement('#logout', fixture);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.logout).toHaveBeenCalled();
      })
    });

    it('should navigate to the user profile', () => {
      spyOn(component, 'showUserProfile');

      fixture.detectChanges();
      clickOnElement('#user-profile', fixture);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.showUserProfile).toHaveBeenCalled();
      })
    });

    it('should navigate to the home component', () => {
      checkRouterNavigation(fixture, fakeRouterService, '#sidenav-logo', '/home');
    });

    it('should navigate to the teams component', () => {
      fixture.detectChanges(); //call since teams element is created with an ngIf
      checkRouterNavigation(fixture, fakeRouterService, '#teams', '/teams');
    });

    it('should navigate to the aboutUs component', () => {
      checkRouterNavigation(fixture, fakeRouterService, '#about-us', '/aboutUs');
    });

    it('should navigate to the contact component', () => {
      checkRouterNavigation(fixture, fakeRouterService, '#contact', '/contact');
    });
  })
});
