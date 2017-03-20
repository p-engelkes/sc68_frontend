import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TeamsComponent} from "../../../components/team/teams.component";
import {FakeTeamService, queryAll} from "../spec.utils";
import {TeamService} from "../../../services/team.service";
import {TeamCardComponent} from "../../../components/team/team.card.component";
describe('Team Component', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamsComponent, TeamCardComponent],
      providers: [
        {provide: TeamService, useClass: FakeTeamService}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should have 2 cards with teams', () => {
    let cardsDebugElement = queryAll('team-card-component', fixture);
    expect(cardsDebugElement.length).toBe(2);
  });
});
