import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TeamCardComponent} from "../../../components/team/team.card.component";
import {queryElement} from "../spec.utils";
describe('Team Card Component', () => {
  let fixture: ComponentFixture<TeamCardComponent>;
  let component: TeamCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamCardComponent]
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
