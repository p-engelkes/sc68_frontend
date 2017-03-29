import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../../models/team";
import {TeamService} from "../../services/team.service";
import {NavBarService} from "../../services/navbar.service";
@Component({
  selector: 'team-component',
  templateUrl: './team.component.html'
})
export class TeamComponent implements OnInit{
  id: number;
  team: Team;

  constructor(private route: ActivatedRoute,
              private teamService: TeamService,
              private navbarService: NavBarService) {
    let snapshot = this.route.snapshot;
    this.id = +snapshot.params['id'];
  }

  async ngOnInit() {
    try {
      this.team = await this.teamService.findById(this.id);
      this.navbarService.changeTitle(this.team.name);
    } catch (error) {
      console.log(error);
    }
  }
}
