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
  public id: string;
  public type: string;
  public formControlName: string;
  public placeHolder: string;

  public static create(): Field {
    return new Field();
  }

  public setControl(control: AbstractControl): Field {
    this.control = control;
    return this;
  }

  public setValidators(validators: FormValidators[]): Field {
    this.validators = validators;
    return this;
  }

  public setMessages(messages: string[]): Field {
    this.messages = messages;
    return this;
  }

  public setId(id: string): Field {
    this.id = id;
    return this;
  }

  public setType(type: string): Field {
    this.type = type;
    return this;
  }

  public setFormControlName(formControlName: string): Field {
    this.formControlName = formControlName;
    return this;
  }

  public setPlaceHolder(placeHolder: string): Field {
    this.placeHolder = placeHolder;
    return this;
  }

  getError(): string {
    let error = "";

    for (let i = 0; i < this.validators.length; i++) {
      error += Field.computeError(error, this.messages[i], this.control.hasError(this.validators[i].toString()));
    }

    return error;
  }

  getValidationClass(): string {
    if (this.control.touched == false) {
      return "";
    } else {
      let valid = true;
      for (let i = 0; i < this.validators.length; i++) {
        if (this.control.hasError(this.validators[i].toString())) {
          valid = false;
        }
      }

      if (valid) {
        return 'valid';
      } else {
        return 'invalid';
      }
    }
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
