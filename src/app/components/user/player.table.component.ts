import {Component, Input, OnInit} from '@angular/core';
import {TeamService} from "../../services/team.service";
import {User} from "../../models/user";
import {RouterService} from "../../services/router.service";
@Component({
  selector: 'player-table-component',
  templateUrl: './player.table.component.html'
})
export class PlayerTableComponent implements OnInit {
  @Input()
  teamId: number;

  users: User[];

  constructor(private teamService: TeamService,
              private routerService: RouterService) {}

  async ngOnInit() {
    let data  = await this.teamService.findAllPlayersByTeam(this.teamId);
    this.users = User.getAll(data);

    // this.teamService.findAllPlayersByTeam(this.teamId).subscribe(
    //   data => this.users = User.getAll(data),
    //   error => console.log(error)
    // );
  };

  onPlayerClick(user: User) {
    this.routerService.navigateToWithParameter("/user", user.id);
  }
}
