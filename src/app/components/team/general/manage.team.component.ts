import {Component, OnInit} from "@angular/core";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OldClassService} from "../../../services/old.class.service";
import {OldClass} from "../../../models/old.class";
import {NavBarService} from "../../../services/navbar.service";
import {Field, FormValidators} from "../../../validators";
import {Team, TrainingTimes} from "../../../models/team";
import {TeamService} from "../../../services/team.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LocationService} from "../../../services/location.service";
import {FormAction} from "../../ui/FormEnums";
import {Notification, NotificationService, NotificationType} from "../../../services/notification.service";
declare var jQuery: any;
@Component({
  selector: 'manage-team-component',
  templateUrl: './manage.team.component.html',
  styleUrls: ['./manage.team.component.scss']
})
export class ManageTeamComponent implements OnInit {
  public manageTeamForm: FormGroup;
  public oldClasses: OldClass[];
  nameField: Field;
  soccerIdField: Field;
  orderNumberField: Field;
  private currentTeam: Team;
  private formAction: FormAction;
  private locationService: LocationService;

  constructor(private formBuilder: FormBuilder,
              private oldClassService: OldClassService,
              private navBarService: NavBarService,
              private teamService: TeamService,
              private router: Router,
              private route: ActivatedRoute,
              private notificationService: NotificationService,
              locationService: LocationService) {
    this.locationService = locationService;
  }

  async ngOnInit() {
    let snapshot = this.route.snapshot.parent;
    if (snapshot && snapshot.params['id']) {
      this.formAction = FormAction.EDIT;
      this.navBarService.changeTitle('Team bearbeiten');
      this.currentTeam = await this.teamService.findById(+snapshot.params['id']);
      this.manageTeamForm = this.formBuilder.group({
        name: [this.currentTeam.name, [Validators.required]],
        soccerId: [this.currentTeam.soccerId],
        oldClass: [this.currentTeam.oldClassId, [Validators.required]],
        orderNumber: [this.currentTeam.orderNumber, [Validators.required]],
        trainingTimes: this.formBuilder.array([
          this.initTrainingTimes()
        ])
      });

      this.removeTrainingTime(0);

      for (let trainingTime of this.currentTeam.trainingTimes) {
        this.addTrainingTime(trainingTime);
      }
    } else {
      this.formAction = FormAction.ADD;
      this.navBarService.changeTitle('Team hinzufügen');
      this.manageTeamForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        soccerId: [''],
        oldClass: ['', [Validators.required]],
        orderNumber: ['', Validators.required],
        trainingTimes: this.formBuilder.array([
          this.initTrainingTimes()
        ])
      });
    }

    this.nameField = Field.create()
      .setControl(this.manageTeamForm.controls['name'])
      .setValidators([FormValidators.REQUIRED, FormValidators.MIN_LENGTH])
      .setMessages(['Ein Name muss angegeben werden', 'Der Name ist zu kurz'])
      .setId('name').setType('text').setFormControlName('name').setPlaceHolder("Teamname").setShouldValidate(true)
      .setIsMandatory(true);

    this.orderNumberField = Field.create()
      .setControl(this.manageTeamForm.controls['orderNumber'])
      .setValidators([FormValidators.REQUIRED])
      .setMessages(['Eine Nummer für die Reihenfolge muss angegeben werden'])
      .setId('orderNumber').setType('number').setFormControlName('orderNumber').setPlaceHolder('Reihenfolge')
      .setShouldValidate(true).setIsMandatory(true);

    this.soccerIdField = Field.create()
      .setControl(this.manageTeamForm.controls['soccerId'])
      .setId('soccerId').setType('text').setFormControlName('soccerId').setPlaceHolder("Fussball.de Team-ID");

    try {
      this.oldClasses = await this.oldClassService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  updateOldClassValue(newValue: number) {
    this.manageTeamForm.controls['oldClass'].setValue(newValue);
  }

  updateDayValue(newValue: number, index: number) {
    const control = <FormArray>this.manageTeamForm.controls['trainingTimes'];
    let formGroup = <FormGroup>control.at(index);
    formGroup.controls['day'].setValue(newValue);
  }

  initTrainingTimes(trainingTime?: TrainingTimes) {
    if (trainingTime) {
      let trainingTimeValue = days.indexOf(trainingTime.day);
      return this.formBuilder.group({
        day: [trainingTimeValue],
        time: [trainingTime.time]
      });
    } else {
      return this.formBuilder.group({
        day: ['', Validators.required],
        time: ['', Validators.required]
      });
    }
  }

  addTrainingTime(trainingTime?: TrainingTimes) {
    const control = <FormArray>this.manageTeamForm.controls['trainingTimes'];
    control.push(this.initTrainingTimes(trainingTime));
  }

  removeTrainingTime(i: number) {
    const control = <FormArray>this.manageTeamForm.controls['trainingTimes'];
    control.removeAt(i);
  }

  getSubmitButtonText() {
    if (this.formAction === FormAction.ADD) {
      return 'Team hinzufügen';
    } else if (this.formAction === FormAction.EDIT) {
      return 'Team bearbeiten';
    }
  }

  async addTeam(team: Team) {
    if (this.manageTeamForm.valid) {
      Team.prepareForJson(team);
      if (this.formAction === FormAction.EDIT) {
        try {
          team.id = this.currentTeam.id;
          await this.teamService.update(team);
          this.router.navigate(['/teams', this.currentTeam.id])
          this.notificationService.setNotification(new Notification("Team erfolgreich geändert", NotificationType.SUCCESS));
        } catch (e) {
          this.notificationService.showNotification(new Notification("Team konnte nicht geändert werden", NotificationType.ERROR));
        }
      } else {
        try {
          let createdTeam = await this.teamService.add(team);
          this.router.navigate(['/teams', createdTeam.id]);
          this.notificationService.setNotification(new Notification("Team erfolgreich erstellt", NotificationType.SUCCESS));
        } catch (e) {
          this.notificationService.showNotification(new Notification("Team konnte nicht erstellt werden", NotificationType.ERROR));
        }
      }
    }
  }
}

export let days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
