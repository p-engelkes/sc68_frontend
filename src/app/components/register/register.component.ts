/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {Field, FormValidators, matchingPasswords} from "../../validators";
import {User} from "../../models/user";
import {LoginService} from "../../services/login.service";
import {Notification, NotificationService, NotificationType} from "../../services/notification.service";
import {EditInputFieldComponent} from "../ui/input_fields/edit_input_field/edit.input.field.component";
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  @ViewChild('focusableField') focusableField: EditInputFieldComponent;

  registerForm: FormGroup;
  emailField: Field;
  passwordField: Field;

  constructor(private registerService: RegisterService,
              private loginService: LoginService,
              private notificationService: NotificationService,
              formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: [null, Validators.required]
    }, {validator: matchingPasswords('password', 'passwordConfirmation')});

    this.emailField = Field.create()
      .setControl(this.registerForm.controls['email'])
      .setValidators([FormValidators.REQUIRED, FormValidators.MIN_LENGTH, FormValidators.MAX_LENGTH])
      .setMessages([
        "Eine E-Mail Adresse muss angegeben werden",
        "Die E-Mail Adresse muss mindestens 3 Zeichen lang sein",
        "Die E-Mail Adresse darf nicht länger als 30 Zeichen lang sein"
      ])
      .setId('email').setType('email').setFormControlName('email').setPlaceHolder('E-Mail').setShouldValidate(true)
      .setIsMandatory(true);

    this.passwordField = Field.create()
      .setControl(this.registerForm.controls['password'])
      .setValidators([FormValidators.REQUIRED, FormValidators.MIN_LENGTH])
      .setMessages([
        "Ein Passwort muss angegeben werden",
        "Das Passwort muss mindestens 6 Zeichen lang sein"
      ])
      .setId('password').setType('password').setFormControlName('password').setPlaceHolder('Passwort')
      .setShouldValidate(true).setIsMandatory(true);
  }

  async submit(event, value: any) {
    if (event) {
      if (event.keyCode == 13 && this.registerForm.valid) {
        await this.register(value);
      }
    } else {
      if (this.registerForm.valid) {
        await this.register(value)
      }
    }
  }

  private async register(value: any) {
    let email = value.email;
    let password = value.password;
    let user = User.registerUser(email, password);

    try {
      await this.registerService.register(user);
      await this.logIn(email, password);
      this.notificationService.setNotification(new Notification("Registration erfolgreich", NotificationType.SUCCESS));
      jQuery('#register_modal').modal('close');
      location.reload();
    } catch (error) {
      console.log(error);
      this.notificationService.showErrorNotification(error);
    }
  }

  private async logIn(email: string, password: string) {
    try {
      await this.loginService.logIn(email, password);
      await this.loginService.verifyToken(email);
    } catch (error) {
      console.log(error);
    }
  }

  private abort() {
    jQuery('#register_modal').modal('close');
  }

  getPasswordConfirmationError(): string {
    let error = "";
    error += Field.computeError(error, "Die Passwörter müssen übereinstimmen", this.registerForm.hasError('mismatchedPasswords'));
    error += Field.computeError(error, "Die Passwortbestätigung muss eingegeben werden", this.registerForm.controls['passwordConfirmation'].hasError(FormValidators.REQUIRED.toString()));

    return error;
  }
}
