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
import {LocationService} from "../../services/location.service";
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
  private locationService: LocationService;

  constructor(private userService: UserService,
              private dataService: DataService,
              private teamService: TeamService,
              private formBuilder: FormBuilder,
              private router: Router,
              locationService: LocationService) {
    this.locationService = locationService;
  }

  async ngOnInit() {
    this.user = this.dataService.user;
    if (!this.user) {
      try {
        this.user = await this.userService.getUser(LocalStorage.getCurrentUserId());
      } catch (error) {
        console.log("Error in getUser");
        console.log(error);
      }
    }

    try {
      this.positions = await this.userService.getAllPositions();
    } catch (error) {
      console.log(error);
    }

    try {
      this.teams = await this.teamService.getAllTeams();
    } catch (error) {
      console.log(error);
    }

    this.editUserForm = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
      position: [this.user.position],
      backNumber: [this.user.backNumber],
      team: [this.user.team ? this.user.team : '']
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

  async updateUserProfile(value: any) {
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

      try {
        await this.userService.update(currentUserId, user);
        Materialize.toast('Erfolgreich aktualisiert', 4000);
      } catch (err) {
        Materialize.toast('Fehler bei der Aktualisierung', 4000);
      }
    }
  }
}
