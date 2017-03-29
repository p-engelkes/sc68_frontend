/**
 * Created by pengelkes on 02.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {TeamService} from "../../services/team.service";
import {Team} from "../../models/team";
@Component({
  selector: 'team',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit{
  teams: Team[] = [];

  constructor(private teamService: TeamService) {
  }

  async ngOnInit() {
    try {
      this.teams = await this.teamService.getAllTeams()
      console.log(this.teams);
    } catch (error) {
      console.log(error);
    }
  }
}
