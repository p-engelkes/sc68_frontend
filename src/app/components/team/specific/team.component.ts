import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Team} from "../../../models/team";
import {TeamService} from "../../../services/team.service";
import {NavBarService} from "../../../services/navbar.service";
import {carouselHrefs} from "../../../models/profile.picture";
import {TeamPictureCarouselComponent} from "./team_picture/team.picture.carousel";
import {SeasonTableTeamService} from "../../../services/season.table.service";
import {SeasonTableTeam} from "../../../models/season.table.team";
import {SeasonGame} from "../../../models/season.game";
import {GameService} from "../../../services/game.service";
import {User} from "../../../models/user";
@Component({
  selector: 'team-component',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit{
  id: number;
  team: Team;
  seasonTableTeams: SeasonTableTeam[];
  games: SeasonGame[];
  players: User[];
  carouselHrefs: string[];

  @ViewChild('teamPictures') teamPicturesComponent: TeamPictureCarouselComponent;

  constructor(private route: ActivatedRoute,
              private teamService: TeamService,
              private navbarService: NavBarService,
              private seasonTableTeamService: SeasonTableTeamService,
              private gameService: GameService) {
    this.carouselHrefs = carouselHrefs;
    let snapshot = this.route.snapshot;
    this.id = +snapshot.params['id'];
  }

  async ngOnInit() {
    try {
      this.team = await this.teamService.findById(this.id);
      this.seasonTableTeams = await this.seasonTableTeamService.findByTeam(this.team.id);
      this.games = await this.gameService.findByTeamAndType(this.team.id, 'PREVIOUS');
      this.players = await this.teamService.findAllPlayersByTeam(this.team.id);
      await this.teamService.findPicturesByTeam(this.team);
      this.navbarService.changeTitle(this.team.name);
    } catch (error) {
      console.log(error);
    }
  }
}
