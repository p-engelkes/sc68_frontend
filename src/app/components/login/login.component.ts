/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
import {User} from "../../models/user";

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


  login(value: any) {
    if (this.loginForm.valid) {
      let email = value.email;
      let password = value.password;
      this.loginService.logIn(email, password).subscribe(
        data => {
          let responseBody = JSON.parse(JSON.stringify(data))._body;
          let response = JSON.parse(responseBody);
          let accessToken = response.access_token;
          LocalStorage.setToken(accessToken);
          this.loginService.verifyToken(email).subscribe(
            data => {
              let response = JSON.parse(JSON.stringify(data))._body;
              let user = User.deserialize(JSON.parse(response));
              LocalStorage.setCurrentUserId(user.id + "");
              LocalStorage.setCurrentUserName(user.getFullName());
              LocalStorage.setCurrentEmail(email);
              LocalStorage.setLoggedIn(true);
              jQuery('#login_modal').closeModal();
              Materialize.toast("Login erfolgreich", 4000);
              location.reload();
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    }
  }
}
