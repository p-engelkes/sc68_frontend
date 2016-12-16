/**
 * Created by pengelkes on 05.12.2016.
 */
import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Team} from "../../models/team";
import {Position, User} from "../../models/user";
import {TeamService} from "../../services/team.service";
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";
declare var jQuery: any;
declare var Materialize: any;

@Component({
  selector: 'chooseTeam',
  templateUrl: 'chooseTeam.component.html'
})
export class ChooseTeamComponent {
  chooseTeamForm: FormGroup;
  teams: Team[];
  positions: Position[];

  constructor(private teamService: TeamService,
              private userService: UserService,
              private loginService: LoginService,
              formBuilder: FormBuilder) {
    teamService.getAllTeamsWithoutAuthorization().subscribe(
      data => {
        this.teams = Team.getTeamsFromJson(data);
      },
      error => console.log(error)
    );

    userService.getAllPositions().subscribe(
      data => this.positions = Position.getPositionsFromJson(data),
      error => console.log(error)
    );

    this.chooseTeamForm = formBuilder.group({
      team: [null, Validators.required],
      position: [null, Validators.required]
    })
  }

  isFan() {
    return !(jQuery('#position').val() && jQuery('#team').val());
  }

  chooseTeamAndPosition() {
    let email = localStorage.getItem('loginMail');
    let password = localStorage.getItem('loginPassword');
    if (this.isFan()) {
      //login
      this.logIn(email, password);
    } else {
      //update user and login
      let position = jQuery('#position').val();
      let teamId = jQuery('#team').val();
      let userId = localStorage.getItem('currentUserId');
      let user = new User();
      user.position = position;
      user.teamId = teamId;
      user.id = +userId;
      this.userService.update(+userId, user).subscribe(
        data => {
          this.logIn(email, password);
        },
        error => console.log(error)
      );
    }
  }

  private logIn(email: string, password: string) {
    this.loginService.logIn(email, password).subscribe(
      data => {
        let responseBody = JSON.parse(JSON.stringify(data))._body;
        let response = JSON.parse(responseBody);
        let accessToken = response.access_token;
        localStorage.setItem('token', accessToken);
        this.loginService.verifyToken(accessToken).subscribe(
          data => {
            localStorage.setItem('currentUserName', email);
            localStorage.setItem('isLoggedIn', "true");
            Materialize.toast("Registration erfolgreich", 4000);
          },
          error => console.log(error)
        );
      },
      error => console.log(error)
    );
  }
}
