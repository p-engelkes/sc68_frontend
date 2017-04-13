import {Component, Input} from "@angular/core";
import {User} from "../../models/user";
import {RouterService} from "../../services/router.service";
@Component({
  selector: 'player-table-component',
  templateUrl: './player.table.component.html'
})
export class PlayerTableComponent {
  @Input()
  players: User[];

  header: 'Spieler';

  constructor(private routerService: RouterService) {
  }

  onPlayerClick(user: User) {
    this.routerService.navigateToWithParameter("/user", user.id);
  }
}
