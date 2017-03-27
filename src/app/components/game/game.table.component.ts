import {Component, Input, OnInit} from "@angular/core";
import {GameService} from "../../services/game.service";
import {SeasonGame} from "../../models/season.game";
@Component({
  selector: 'game-table-component',
  templateUrl: './game.table.component.html'
})
export class GameTableComponent implements OnInit {
  @Input()
  teamId: number;
  @Input()
  gameTye: string;

  games: SeasonGame[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.findByTeamAndType(this.teamId, this.gameTye).subscribe(
      data => this.games = SeasonGame.getSeasonGamesFromJson(data),
      error => console.log(error)
    );
  }
}
