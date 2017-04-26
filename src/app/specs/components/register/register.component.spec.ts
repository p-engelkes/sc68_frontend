import {async, ComponentFixture, fakeAsync, TestBed} from "@angular/core/testing";
import {RegisterComponent} from "../../../components/register/register.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterService} from "../../../services/register.service";
import {FakeLoginService, FakeRegisterService, FakeRouter, queryElement, setInputValue} from "../spec.utils";
import {Router} from "@angular/router";
import {EditInputFieldComponent} from "../../../components/ui/input_fields/edit_input_field/edit.input.field.component";
import {By} from "@angular/platform-browser";
import {LoginService} from "../../../services/login.service";
describe('Register Component', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, EditInputFieldComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {provide: LoginService, useClass: FakeLoginService},
        {provide: RegisterService, useClass: FakeRegisterService},
        {provide: Router, useClass: FakeRouter}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should be a modal dialog with the id register_modal', () => {
    let modalDebugElement = fixture.debugElement.query(By.css('.modal'));
    expect(modalDebugElement).not.toBeNull();

    let modalLoginDebugElement = fixture.debugElement.query(By.css('#register_modal'));
    expect(modalLoginDebugElement).not.toBeNull();
  });

  it('should have 3 input fields and each of them should have a label', () => {
    let inputFields = fixture.debugElement.queryAll(By.css('.input-field'));
    expect(inputFields.length).toBe(3);

    let labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels.length).toBe(3);
  });

  it('should set the registerFormValues according to the input fields', fakeAsync(() => {
    fixture.detectChanges();
    let emailDebugElement = queryElement('#email', fixture);
    setInputValue(emailDebugElement, 'email', fixture);

    let passwordDebugElement = queryElement('#password', fixture);
    setInputValue(passwordDebugElement, 'password', fixture);

    let passwordConfirmationDebugElement = queryElement('#passwordConfirmation', fixture);
    setInputValue(passwordConfirmationDebugElement, 'password', fixture);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.registerForm.value.email).toBe('email');
      expect(component.registerForm.value.password).toBe('password');
      expect(component.registerForm.value.passwordConfirmation).toBe('password');
    });
  }));

  it('should call the register action on Register-Button click with the value entered in the input fields',
    fakeAsync(() => {
      spyOn(component, 'register');

      let button = queryElement('.btn', fixture);
      button.triggerEventHandler('click', null);

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(component.register).toHaveBeenCalledWith(component.registerForm.value);
      });
    }));
});
