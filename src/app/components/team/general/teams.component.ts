/**
 * Created by pengelkes on 02.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {OldClass} from "../../../models/old.class";
import {OldClassService} from "../../../services/old.class.service";
import {NavBarService} from "../../../services/navbar.service";
import {TeamService} from "../../../services/team.service";
@Component({
  selector: 'team',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit{
  oldClasses: OldClass[];

  constructor(private oldClassService: OldClassService,
              private navBarService: NavBarService,
              private teamService: TeamService) {
    this.navBarService.changeTitle("Teams");
  }

  async ngOnInit() {
    try {
      this.oldClasses = await this.oldClassService.findAllWithTeams()
    } catch (error) {
      console.log(error);
    }
  }
}
