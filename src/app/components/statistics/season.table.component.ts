import {Component, Input, OnInit} from "@angular/core";
import {SeasonTableTeam} from "../../models/season.table.team";
import {SeasonTableTeamService} from "../../services/season.table.service";
@Component({
  selector: 'season-table-component',
  templateUrl: './season.table.component.html'
})
export class SeasonTableComponent implements OnInit {
  @Input()
  teamId: number;

  public header = 'Tabelle';
  seasonTableTeams: SeasonTableTeam[];

  constructor(private seasonTableTeamService: SeasonTableTeamService) {}

  async ngOnInit() {
    try {
      this.seasonTableTeams = await this.seasonTableTeamService.findByTeam(this.teamId);
    } catch (error) {
      console.log(error);
    }
  }
}
