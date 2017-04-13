import {Component, Input} from "@angular/core";
import {SeasonGame} from "../../models/season.game";
@Component({
  selector: 'game-table-component',
  templateUrl: './game.table.component.html'
})
export class GameTableComponent {
  @Input()
  games: SeasonGame[];

  public header = 'Spiele';
}
