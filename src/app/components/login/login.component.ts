/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'logIn',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router,
              formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  getEmailError(): string {
    let error = "";
    if (this.loginForm.controls['email'].hasError('required')) {
      error += "Ein Benutzername muss eingegeben werden"
    }

    return error;
  }

  getPasswordError(): string {
    let error = "";
    if (this.loginForm.controls['password'].hasError('required')) {
      error += "Ein Password muss eingegeben werden";
    }

    return error;
  }


  async login(value: any) {
    if (this.loginForm.valid) {
      let email = value.email;
      let password = value.password;

      try {
        await this.loginService.logIn(email, password);
        await this.loginService.verifyToken(email);

        jQuery('#login_modal').modal('close');
        Materialize.toast("Login erfolgreich", 4000);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  }
}
