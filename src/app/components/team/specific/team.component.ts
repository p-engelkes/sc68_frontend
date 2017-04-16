import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {Team} from "../../../models/team";
import {TeamService} from "../../../services/team.service";
import {NavBarService} from "../../../services/navbar.service";
import {carouselHrefs} from "../../../models/profile.picture";
import {SeasonTableTeamService} from "../../../services/season.table.service";
import {SeasonTableTeam} from "../../../models/season.table.team";
import {SeasonGame} from "../../../models/season.game";
import {GameService} from "../../../services/game.service";
import {User} from "../../../models/user";
import {Subscription} from "rxjs";
@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  id: number;
  team: Team;
  seasonTableTeams: SeasonTableTeam[];
  games: SeasonGame[];
  players: User[];
  carouselHrefs: string[];
  subscribtion: Subscription;

  constructor(private route: ActivatedRoute,
              private teamService: TeamService,
              private navbarService: NavBarService,
              private seasonTableTeamService: SeasonTableTeamService,
              private gameService: GameService,
              private router: Router) {
    this.carouselHrefs = carouselHrefs;
    let snapshot = this.route.snapshot;
    this.id = +snapshot.params['id'];
  }

  async ngOnInit() {
    this.subscribtion = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let urlParts = event.url.split("/");
        let id = +urlParts[urlParts.length - 1];
        if (id) {
          this.initTeamComponent(id);
        }
      }
    });

    await this.initTeamComponent(this.id);
  }

  private async initTeamComponent(id: number) {
    try {
      this.team = await this.teamService.findById(id);
      this.seasonTableTeams = await this.seasonTableTeamService.findByTeam(this.team.id);
      this.games = await this.gameService.findByTeamAndType(this.team.id, 'PREVIOUS');
      this.players = await this.teamService.findAllPlayersByTeam(this.team.id);
      await this.teamService.findPicturesByTeam(this.team);
      this.navbarService.changeTitle(this.team.name);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }
}
