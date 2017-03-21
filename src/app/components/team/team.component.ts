import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../../models/team";
import {TeamService} from "../../services/team.service";
import {NavBarService} from "../../services/navbar.service";
@Component({
  selector: 'team-component',
  templateUrl: './team.component.html'
})
export class TeamComponent {
  team: Team;

  constructor(private route: ActivatedRoute,
              private teamService: TeamService,
              private navbarService: NavBarService) {
    let snapshot = this.route.snapshot;
    let id = +snapshot.params['id'];
    this.teamService.findById(id).subscribe(
      data => {
        let json = JSON.parse(JSON.parse(JSON.stringify(data))._body);
        this.team = Team.deserialize(json);
        this.navbarService.changeTitle(this.team.name);
      },
      error => console.log(error)
    );
  }
}
