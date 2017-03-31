/**
 * Created by patrickengelkes on 30/03/2017.
 */
import {Component, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'add-training-time-component',
  templateUrl: './add.training.time.component.html'
})
export class AddTrainingTimeComponent {
  @Input('form-group')
  public addTeamForm: FormGroup;
}
