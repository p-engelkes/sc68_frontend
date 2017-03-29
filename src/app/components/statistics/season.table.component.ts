import {Component, Input, OnInit} from "@angular/core";
import {Team} from "../../models/team";
import {SeasonTableTeam} from "../../models/season.table.team";
import {SeasonTableTeamService} from "../../services/season.table.service";
@Component({
  selector: 'season-table-component',
  templateUrl: './season.table.component.html'
})
export class SeasonTableComponent implements OnInit {
  @Input()
  team: Team;

  seasonTableTeams: SeasonTableTeam[];

  constructor(private seasonTableTeamService: SeasonTableTeamService) {}

  async ngOnInit() {
    try {
      this.seasonTableTeams = await this.seasonTableTeamService.findByTeam(this.team.id);
    } catch (error) {
      console.log(error);
    }
  }
}
