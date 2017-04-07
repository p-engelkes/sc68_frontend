import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../../../models/team";
import {TeamService} from "../../../services/team.service";
import {NavBarService} from "../../../services/navbar.service";
import {carouselHrefs} from "../../../models/profile.picture";
@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{
  id: number;
  team: Team;
  carouselHrefs: string[];

  constructor(private route: ActivatedRoute,
              private teamService: TeamService,
              private navbarService: NavBarService) {
    this.carouselHrefs = carouselHrefs;
    let snapshot = this.route.snapshot;
    this.id = +snapshot.params['id'];
  }

  async ngOnInit() {
    try {
      this.team = await this.teamService.findById(this.id);
      await this.teamService.findPicturesByTeam(this.team);
      this.navbarService.changeTitle(this.team.name);
    } catch (error) {
      console.log(error);
    }
  }
}
