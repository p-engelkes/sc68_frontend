/**
 * Created by pengelkes on 29.12.2016.
 */
import {Component, Input} from "@angular/core";
import {Field} from "../../validators";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'edit-property',
  templateUrl: './edit.property.component.html'
})
export class EditPropertyComponent {
  @Input() formGroup: FormGroup
  @Input() propertyField: Field
}
