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
    teamService.getAllTeams().subscribe(
      data => {
        this.teams = Team.getTeamsFromJson(data);
      },
      error => {
        console.log(error);
      }
    );
  }
}
