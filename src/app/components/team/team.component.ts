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
  private teams: Team[];

  constructor(private teamService: TeamService) {
    this.teamService.getAllTeams().subscribe(
      data => {
        let teamResponse = JSON.parse(JSON.stringify(data))._body;
        let teamJson = JSON.parse(teamResponse);
        let team = new Team().deserialize(teamJson);
        console.log(team);
      },
      error => console.log(error)
    )
  }
}
