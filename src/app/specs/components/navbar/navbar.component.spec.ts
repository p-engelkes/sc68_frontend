import {NavbarComponent} from "../../../components/navbar/navbar.component";
import {ComponentFixture, async, TestBed, fakeAsync} from "@angular/core/testing";
import {LoginService} from "../../../services/login.service";
import {FakeLoginService, FakeRouter, FakeRegisterService} from "../spec.utils";
import {By} from "@angular/platform-browser";
import {LoginComponent} from "../../../components/login/login.component";
import {RegisterComponent} from "../../../components/register/register.component";
import {Router} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {EditInputFieldComponent} from "../../../components/ui/edit.input.field.component";
import {RegisterService} from "../../../services/register.service";
import {DebugElement} from "@angular/core";
describe('Navbar Component', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let fakeLoginService: FakeLoginService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent, LoginComponent, RegisterComponent, EditInputFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: LoginService, useClass: FakeLoginService},
        {provide: RegisterService, useClass: FakeRegisterService},
        {provide: Router, useClass: FakeRouter},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    fakeLoginService = fixture.debugElement.injector.get(LoginService);
    component = fixture.componentInstance;
  });

  it('should include the login and register modal components', () => {
    let loginDebugElement = fixture.debugElement.query(By.css('logIn'));
    expect(loginDebugElement).not.toBeNull();

    let registerDebugElement = fixture.debugElement.query(By.css('register'));
    expect(registerDebugElement).not.toBeNull();
  });

  it('should have a centered brand logo', () => {
    let brandLogoDebugElement = fixture.debugElement.query(By.css('.brand-logo'));
    expect(brandLogoDebugElement.attributes['class']).toContain('center');
    expect(brandLogoDebugElement.nativeElement.innerText).toBe('Skiclub 68');
  });

  describe('left navigation', () => {
    let leftNavDebugElement: DebugElement;

    beforeEach(() => {
      leftNavDebugElement = fixture.debugElement.query(By.css('.left'));
    });

    it('should have a left aligned navigation', () => {
      expect(leftNavDebugElement).not.toBeNull();
    });

    it('should have two links if the user is logged in', () => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(leftNavDebugElement.children.length).toBe(2);
      });
    });

    it('should have one link if the user is not logged in', fakeAsync(() => {
      spyOn(fakeLoginService, 'isLoggedIn').and.returnValue(false);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(leftNavDebugElement.children.length).toBe(1);
      });
    }));
  });

  describe('right navigation', () => {
    let rightNavDebugElement: DebugElement;

    beforeEach(() => {
      rightNavDebugElement = fixture.debugElement.query(By.css('.right'));
    });

    it('should have a right aligned navigation', () => {
      expect(rightNavDebugElement).not.toBeNull();
    });

    it('should have four links', () => {
      fixture.detectChanges()
      fixture.whenStable().then(() => {
        expect(rightNavDebugElement.children.length).toBe(4);
      });
    })
  })
});
