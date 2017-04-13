import {Component, Input} from "@angular/core";
import {SeasonTableTeam} from "../../models/season.table.team";
@Component({
  selector: 'season-table-component',
  templateUrl: './season.table.component.html'
})
export class SeasonTableComponent {
  @Input()
  seasonTableTeams: SeasonTableTeam[];

  public header = 'Tabelle';
}
