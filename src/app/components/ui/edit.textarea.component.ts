import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Field} from "../../validators";
@Component({
  selector: 'edit-text-area',
  templateUrl: 'edit.textarea.component.html'
})
export class EditTextAreaComponent {
  @Input() formGroup: FormGroup;
  @Input() propertyField: Field;
}
