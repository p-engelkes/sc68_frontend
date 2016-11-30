import {FormGroup, AbstractControl} from "@angular/forms";
/**
 * Created by pengelkes on 30.11.2016.
 */
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    let password = group.controls[passwordKey];
    let confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      }
    }
  }
}

export enum FormValidators {
  REQUIRED = <any>"required",
  MIN_LENGTH = <any>"minlength",
  MAX_LENGTH = <any>"maxlength"
}

export class Field {
  public control: AbstractControl
  public validators: FormValidators[];
  public messages: string[];

  constructor(control: AbstractControl, validators: FormValidators[], messages: string[]) {
    this.control = control;
    this.validators = validators;
    this.messages = messages;
  }

  getError(): string {
    let error = "";

    for (let i = 0; i < this.validators.length; i++) {
      error += Field.computeError(error, this.messages[i], this.control.hasError(this.validators[i].toString()));
    }

    return error;
  }

  static computeError(error: string, message: string, hasError: boolean): string {
    if (hasError) {
      if (error.length > 0) {
        return " " + message;
      } else {
        return message;
      }
    }

    return "";
  }
}
