import {Component, Input, ViewChild} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Field} from "../../../../validators";
import {ValidateInputDirective} from "../../../../directives/validate.input.directive";
@Component({
  selector: 'edit-text-area',
  templateUrl: 'edit.textarea.component.html'
})
export class EditTextAreaComponent {
  @Input() formGroup: FormGroup;
  @Input() propertyField: Field;

  @ViewChild('input') validateInputDirective: ValidateInputDirective
}
