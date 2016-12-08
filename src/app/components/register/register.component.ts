/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {RegisterService} from "../../services/register.service";
import {matchingPasswords, Field, FormValidators} from "../../validators";
import {User} from "../../models/user";
declare var jQuery: any;
@Component({
  selector: 'register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  emailField: Field;
  passwordField: Field;

  constructor(private registerService: RegisterService,
              formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: [null, Validators.required]
    }, {validator: matchingPasswords('password', 'passwordConfirmation')});

    this.emailField = new Field(this.registerForm.controls['email'],
      [FormValidators.REQUIRED, FormValidators.MIN_LENGTH, FormValidators.MAX_LENGTH],
      [
        "Eine E-Mail Adresse muss angegeben werden",
        "Die E-Mail Adresse muss mindestens 3 Zeichen lang sein",
        "Die E-Mail Adresse darf nicht länger als 30 Zeichen lang sein"
      ]
    );
    this.passwordField = new Field(this.registerForm.controls['password'],
      [FormValidators.REQUIRED, FormValidators.MIN_LENGTH],
      [
        "Ein Passwort muss angegeben werden",
        "Das Passwort muss mindestens 6 Zeichen lang sein"
      ]
    );
  }

  register(value: any) {
    if (this.registerForm.valid) {
      let email = value.email;
      let password = value.password;
      let user = new User().registerUser(email, password);
      this.registerService.register(user).subscribe(
        data => {
          jQuery('#register_modal').closeModal();
        },
        error => console.log(error)
      );
    }
  }

  getEmailError(): string {
    return this.emailField.getError();
  }

  getPasswordError(): string {
    return this.passwordField.getError();
  }

  getPasswordConfirmationError(): string {
    let error = "";
    error += Field.computeError(error, "Die Passwörter müssen übereinstimmen", this.registerForm.hasError('mismatchedPasswords'));
    error += Field.computeError(error, "Die Passwortbestätigung muss eingegeben werden", this.registerForm.controls['passwordConfirmation'].hasError(FormValidators.REQUIRED.toString()));

    return error;
  }
}
