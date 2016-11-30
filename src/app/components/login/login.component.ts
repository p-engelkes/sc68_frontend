/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private loginService: LoginService,
              formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      userName: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  getUserNameError(): string {
    let error = "";
    if (this.loginForm.controls['userName'].hasError('required')) {
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
    let userName = value.userName;
    let password = value.password;
    this.loginService.login(userName, password).subscribe(
      data => {
        let responseBody = JSON.parse(JSON.stringify(data))._body;
        let response = JSON.parse(responseBody);
        let accessToken = response.access_token;
        localStorage.setItem('token', accessToken);
        this.loginService.verifyToken(accessToken).subscribe(
          data => {
            localStorage.setItem('currentUserName', userName);
            console.log("Login successful");
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }
}
