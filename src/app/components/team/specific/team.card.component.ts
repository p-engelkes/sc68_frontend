/**
 * Created by patrickengelkes on 20/03/2017.
 */
import {Component, Input, OnInit} from "@angular/core";
import {Team} from "../../../models/team";
import {RouterService} from "../../../services/router.service";
import {Picture} from "../../../models/profile.picture";
import {TeamService} from "../../../services/team.service";
@Component({
  selector: 'team-card-component',
  templateUrl: './team.card.component.html'
})
export class TeamCardComponent implements OnInit {
  @Input()
  team: Team;

  picture: Picture;

  constructor(private routerService: RouterService,
              private teamService: TeamService) {
  }

  async ngOnInit() {
    await this.teamService.findPicturesByTeam(this.team);
    if (this.team.teamPictures && this.team.teamPictures.length > 0) {
      let pictureNumber = Math.floor(Math.random() * this.team.teamPictures.length);
      this.picture = this.team.teamPictures[pictureNumber];
    }
  }

  goToTeamDetail() {
    console.log("Go To Team Detail called");
  }
}
