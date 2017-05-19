/**
 * Created by pengelkes on 29.12.2016.
 */
import {Component, Input, ViewChild} from "@angular/core";
import {Field} from "../../../../validators";
import {FormGroup} from "@angular/forms";
import {ValidateInputDirective} from "../../../../directives/validate.input.directive";
@Component({
  selector: 'edit-input-field',
  templateUrl: 'edit.input.field.component.html'
})
export class EditInputFieldComponent {
  @Input() formGroup: FormGroup;
  @Input() propertyField: Field;

  @ViewChild('input') validateInputDirective: ValidateInputDirective;

  focus() {
    this.validateInputDirective.focus();
  }
}
