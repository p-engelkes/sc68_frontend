/**
 * Created by patrickengelkes on 20/03/2017.
 */
import {Component, Input} from "@angular/core";
import {Team} from "../../models/team";
@Component({
  selector: 'team-card-component',
  templateUrl: './team.card.component.html'
})
export class TeamCardComponent {
  @Input()
  team: Team;
}
