import {LoginComponent} from "../../../components/login/login.component";
import {ComponentFixture, async, TestBed, fakeAsync} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {LoginService} from "../../../services/login.service";
import {FakeLoginService, FakeRouter, setInputValue} from "../spec.utils";
import {Router} from "@angular/router";
import Any = jasmine.Any;

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: LoginService, useClass: FakeLoginService},
        {provide: Router, useClass: FakeRouter}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should be a modal dialog with the id login_modal', () => {
    let modalDebugComponent = fixture.debugElement.query(By.css('.modal'));
    expect(modalDebugComponent).not.toBeNull();

    let modalLoginDebugComponent = fixture.debugElement.query(By.css('#login_modal'));
    expect(modalLoginDebugComponent).not.toBeNull();
  });

  it('should have 2 input fields and each of them should have a label', () => {
    let inputFields = fixture.debugElement.queryAll(By.css('.input-field'));
    expect(inputFields.length).toBe(2);

    let labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels.length).toBe(2);
  });

  it('should set the loginFormvalues according to the input fields', fakeAsync(() => {
    let passwordDebugElement = fixture.debugElement.query(By.css('#password'));
    setInputValue(passwordDebugElement, 'password', fixture);

    let emailDebugElement = fixture.debugElement.query(By.css('#email'));
    setInputValue(emailDebugElement, 'email', fixture);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loginForm.value.email).toBe('email');
      expect(component.loginForm.value.password).toBe('password');
    })
  }));

  it('should call the login action on Login-Button click with the value inside the email and password field',
    fakeAsync(() => {
      spyOn(component, 'login');

      let button = fixture.debugElement.query(By.css('.btn'));
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.login).toHaveBeenCalledWith(component.loginForm.value);
      })
    }));
});
