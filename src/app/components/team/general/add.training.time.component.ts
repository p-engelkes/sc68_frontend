/**
 * Created by patrickengelkes on 30/03/2017.
 */
import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Field, FormValidators} from "../../../validators";
import {days} from "./add.team.component";
@Component({
  selector: 'add-training-time-component',
  templateUrl: './add.training.time.component.html'
})
export class AddTrainingTimeComponent implements OnInit{
  @Input('form-group')
  public addTeamForm: FormGroup;
  @Output() onUpdateDay: EventEmitter<number> = new EventEmitter();

  public trainingDays;

  public timeField: Field;

  ngOnInit(): void {
    this.trainingDays = days;
    this.timeField = Field.create()
      .setControl(this.addTeamForm.controls['time'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages(['Eine Trainingszeit muss angegeben werden'])
      .setId('time').setType('text').setFormControlName('time').setPlaceHolder('Trainingszeit').setShouldValidate(true)
      .setIsMandatory(true);
  }

  updateDay(newValue: number) {
    this.onUpdateDay.emit(newValue);
  }
}
