/**
 * Created by pengelkes on 29.12.2016.
 */
import {Component, Input} from "@angular/core";
import {Field} from "../../validators";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'edit-input-field',
  templateUrl: 'edit.input.field.component.html'
})
export class EditInputFieldComponent {
  @Input() formGroup: FormGroup;
  @Input() propertyField: Field
}
