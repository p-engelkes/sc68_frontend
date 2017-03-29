import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TeamsComponent} from "../../../components/team/general/teams.component";
import {FakeTeamService, queryAll, FakeRouterService} from "../spec.utils";
import {TeamService} from "../../../services/team.service";
import {TeamCardComponent} from "../../../components/team/specific/team.card.component";
import {RouterService} from "../../../services/router.service";
describe('Team Component', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsComponent, TeamCardComponent],
      providers: [
        {provide: TeamService, useClass: FakeTeamService},
        {provide: RouterService, useClass: FakeRouterService}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have 2 cards with teams', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let cardsDebugElement = queryAll('team-card-component', fixture);
      expect(cardsDebugElement.length).toBe(2);
    });
  }));
});
