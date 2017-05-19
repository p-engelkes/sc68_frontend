/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Field, FormValidators} from "../../validators";
import {Notification, NotificationService, NotificationType} from "../../services/notification.service";

declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'logIn',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  emailField: Field;
  passwordField: Field;

  constructor(private loginService: LoginService,
              private notificationService: NotificationService,
              formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

    this.emailField = Field.create()
      .setControl(this.loginForm.controls['email'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages(["Eine E-Mail oder ein Benutzername muss eingegeben werden"])
      .setId('email').setType('text').setFormControlName('email').setPlaceHolder("E-Mail").setShouldValidate(true)
      .setIsMandatory(true);

    this.passwordField = Field.create()
      .setControl(this.loginForm.controls['password'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages(["Ein Password muss eingegbeen werden"])
      .setId('password').setType('password').setFormControlName('password').setPlaceHolder("Password")
      .setShouldValidate(true).setIsMandatory(true);
  }

  async login(value: any) {
    if (this.loginForm.valid) {
      let email = value.email;
      let password = value.password;

      try {
        await this.loginService.logIn(email, password);
        await this.loginService.verifyToken(email);
        this.notificationService.setNotification(new Notification("Login erfolgreich", NotificationType.SUCCESS));
        jQuery('#login_modal').modal('close');
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }

  abort() {
    jQuery('#login_modal').modal('close');
  }
}
