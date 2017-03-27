/**
 * Created by pengelkes on 29.12.2016.
 */
import {Component, NgZone, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {Position, User} from "../../models/user";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Field, FormValidators} from "../../validators";
import {Team} from "../../models/team";
import {TeamService} from "../../services/team.service";
import {LocalStorage} from "../../helper/LocalStorage";
import {Router} from "@angular/router";
import {NgUploaderOptions} from "ngx-uploader";
import {apiUrl} from "../../services/helper.service";
declare var Materialize: any;
declare var jQuery: any;
@Component({
  selector: 'edit-user-profile',
  templateUrl: './edit.user.profile.component.html'
})
export class EditUserProfileComponent implements OnInit {
  uploadFile: any;
  editUserForm: FormGroup;
  firstNameField: Field;
  lastNameField: Field;
  emailField: Field;
  backNumberField: Field;
  user: User;
  private positions: Position[];
  private teams: Team[];
  private zone: NgZone;
  private options: NgUploaderOptions;
  private sizeLimit = 2000000;
  private progress: number;
  private uploading: boolean = false;

  constructor(private userService: UserService,
              private dataService: DataService,
              private teamService: TeamService,
              private formBuilder: FormBuilder,
              private router: Router) {}

  ngOnInit(): void {
    this.user = this.dataService.user;
    if (!this.user) {
      this.userService.getUser(LocalStorage.getCurrentUserId()).subscribe(
        data => this.user = User.getUserFromJsonResponse(data, this.dataService),
        error => console.log(error)
      );
    }
    this.userService.getAllPositions().subscribe(
      data => {
        this.positions = Position.getPositionsFromJson(data);
      },
      error => console.log(error)
    );
    this.teamService.getAllTeams().subscribe(
      data => this.teams = Team.getTeamsFromJson(data),
      error => console.log(error)
    );
    this.editUserForm = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      position: [this.user.position],
      backNumber: [this.user.backNumber],
      team: [this.user.team.id]
    });

    this.firstNameField = Field.create()
      .setControl(this.editUserForm.controls['firstName'])
      .setId('firstName').setType('text').setFormControlName('firstName').setPlaceHolder("Vorname");

    this.lastNameField = Field.create()
      .setControl(this.editUserForm.controls['lastName'])
      .setId('lastName').setType('text').setFormControlName('lastName').setPlaceHolder('Nachname');

    this.emailField = Field.create()
      .setControl(this.editUserForm.controls['email'])
      .setValidators([FormValidators.REQUIRED, FormValidators.MIN_LENGTH, FormValidators.MAX_LENGTH])
      .setMessages([
        "Eine E-Mail Adresse muss angegeben werden",
        "Die E-Mail Adresse muss mindestens 3 Zeichen lang sein",
        "Die E-Mail Adresse darf nicht länger als 30 Zeichen lang sein"
      ])
      .setId('email').setType('email').setFormControlName('email').setPlaceHolder('E-Mail').setShouldValidate(true);

    this.backNumberField = Field.create()
      .setControl(this.editUserForm.controls['backNumber'])
      .setId('backNumber').setType('number').setFormControlName('backNumber').setPlaceHolder('Rückennummer');

    this.zone = new NgZone({enableLongStackTrace: false});
    this.options = {
      url: apiUrl + '/profilePictures/' + LocalStorage.getCurrentUserId() + '/upload',
      authToken: LocalStorage.getToken(),
      authTokenPrefix: 'Bearer',
    }
  }

  handleUpload(data): void {
    setTimeout(() => {
      this.zone.run(() => {
        this.progress = +data.progress.percent;
        if (data && data.response) {
          this.uploading = false;
        }
      });
    });
  }

  beforeUpload(uploadingFile): void {
    this.uploading = true;
    if (uploadingFile.size > this.sizeLimit) {
      this.uploading = false;
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

  updateUserProfile(value: any) {
    if (!this.uploading) {
      this.dataService.user;
      let firstName = value.firstName;
      let lastName = value.lastName;
      let email = value.email;
      let backNumber = value.backNumber;
      let position = jQuery('#position').val();
      let teamId = jQuery('#team').val();

      let user = User.create()
        .setId(this.user.id)
        .setFirstName(firstName)
        .setLastName(lastName)
        .setEmail(email)
        .setBackNumber(backNumber)
        .setPosition(position)
        .setTeamId(teamId)
        .setPassword(this.user.password);
      this.user = user;
      let currentUserId = LocalStorage.getCurrentUserId();

      this.userService.update(currentUserId, user).subscribe(
        data => {
          Materialize.toast("Erfolgreich aktualisiert", 4000);
          this.router.navigate(['/user', currentUserId])
        },
        error => Materialize.toast("Fehler bei der Aktualisierung")
      )
    }
  }
}
