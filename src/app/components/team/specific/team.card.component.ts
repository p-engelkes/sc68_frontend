/**
 * Created by patrickengelkes on 20/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Team} from "../../../models/team";
import {RouterService} from "../../../services/router.service";
@Component({
  selector: 'team-card-component',
  templateUrl: './team.card.component.html'
})
export class TeamCardComponent {
  @Input()
  team: Team;

  constructor(private routerService: RouterService) {
  }

  goToTeamDetail() {
    console.log("Go To Team Detail called");
  }
}
