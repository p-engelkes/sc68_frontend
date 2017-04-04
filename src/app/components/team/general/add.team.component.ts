import {AfterViewInit, Component, OnInit, ViewChild} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OldClassService} from "../../../services/old.class.service";
import {OldClass} from "../../../models/old.class";
import {NavBarService} from "../../../services/navbar.service";
import {Field, FormValidators} from "../../../validators";
import {Team} from "../../../models/team";
import {MaterializeDropdown} from "../../../directives/select.directive";
declare var jQuery: any;
@Component({
  selector: 'add-team-component',
  templateUrl: './add.team.component.html',
  styleUrls: ['./add.team.component.scss']
})
export class AddTeamComponent implements OnInit {
  public addTeamForm: FormGroup;
  public oldClasses: OldClass[];
  nameField: Field;
  soccerIdField: Field;

  constructor(private formBuilder: FormBuilder,
              private oldClassService: OldClassService,
              private navBarService: NavBarService) {
    this.navBarService.changeTitle('Team hinzufügen');
  }

  async ngOnInit() {
    this.addTeamForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      soccerId: [''],
      oldClass: ['', [Validators.required]],
      trainingTimes: this.formBuilder.array([
        this.initTrainingTimes(),
      ])
    });

    this.nameField = Field.create()
      .setControl(this.addTeamForm.controls['name'])
      .setValidators([FormValidators.REQUIRED, FormValidators.MIN_LENGTH])
      .setMessages(['Ein Name muss angegeben werden', 'Der Name ist zu kurz'])
      .setId('name').setType('text').setFormControlName('name').setPlaceHolder("Teamname").setShouldValidate(true);

    this.soccerIdField = Field.create()
      .setControl(this.addTeamForm.controls['soccerId'])
      .setId('soccerId').setType('text').setFormControlName('soccerId').setPlaceHolder("Fussball.de Team-ID");

    try {
      this.oldClasses = await this.oldClassService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  updateOldClassValue(newValue: number) {
    this.addTeamForm.controls['oldClass'].setValue(newValue);
  }

  updateDayValue(newValue: number, index: number) {
    const control = <FormArray>this.addTeamForm.controls['trainingTimes'];
    let formGroup = <FormGroup>control.at(index);
    formGroup.controls['day'].setValue(newValue);
    console.log(formGroup.controls['day'].value);
  }

  initTrainingTimes() {
    return this.formBuilder.group({
      day: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  addTrainingTime() {
    const control = <FormArray>this.addTeamForm.controls['trainingTimes'];
    control.push(this.initTrainingTimes());
  }

  removeTrainingTime(i: number) {
    const control = <FormArray>this.addTeamForm.controls['trainingTimes'];
    control.removeAt(i);
  }

  addTeam(team: Team) {
    if (this.addTeamForm.valid) {
         team.oldClassId = jQuery('#old-class');
         console.log(team);
    }
  }
}
