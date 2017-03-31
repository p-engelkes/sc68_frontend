import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OldClassService} from "../../../services/old.class.service";
import {OldClass} from "../../../models/old.class";
import {NavBarService} from "../../../services/navbar.service";
import {Field} from "../../../validators";
@Component({
  selector: 'add-team-component',
  templateUrl: './add.team.component.html'
})
export class AddTeamComponent implements OnInit {
  public addTeamForm: FormGroup;
  public oldClasses: OldClass[];
  nameField: Field;
  soccerIdField: Field;

  constructor(private formBuilder: FormBuilder,
              private oldClassService: OldClassService,
              private navBarService: NavBarService) {
  }

  async ngOnInit() {
    this.navBarService.changeTitle('Team hinzufügen');
    this.addTeamForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      soccerId: [''],
      oldClass: [''],
      trainingTimes: this.formBuilder.array([
        this.initTrainingTimes(),
      ])
    });

    try {
      this.oldClasses = await this.oldClassService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  initTrainingTimes() {
    return this.formBuilder.group({
      day: ['', Validators.required],
      time: ['']
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

  save(model: any) {
    // call API to save
    // ...
    console.log(model);
  }
}
