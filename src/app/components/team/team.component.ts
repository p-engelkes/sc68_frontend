/**
 * Created by pengelkes on 02.12.2016.
 */
import {Component} from "@angular/core";
import {TeamService} from "../../services/team.service";
import {Team} from "../../models/team";
@Component({
  selector: 'team',
  templateUrl: './team.component.html'
})
export class TeamComponent {
  private teams: Team[] = [];

  constructor(private teamService: TeamService) {
    this.teamService.getAllTeams().subscribe(
      data => {
        let teamResponses = JSON.parse(JSON.stringify(data))._body;
        let teams = JSON.parse(teamResponses);
        for (let i = 0; i < teams.length; i++) {
          let teamJson = teams[i];
          let team = new Team().deserialize(teamJson);
          this.teams.push(team);
        }
      },
      error => console.log(error)
    )
  }
}
