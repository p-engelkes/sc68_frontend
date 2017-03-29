import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TeamCardComponent} from "../../../components/team/team.card.component";
import {FakeRouterService, queryElement} from "../spec.utils";
import {RouterService} from "../../../services/router.service";
describe('Team Card Component', () => {
  let fixture: ComponentFixture<TeamCardComponent>;
  let component: TeamCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardComponent],
      providers: [
        {provide: RouterService, useClass: FakeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display nothing if the team was not set', () => {
    let teamDebugElement = queryElement('.team-card', fixture);
    expect(teamDebugElement).toBeNull();
  })
});
