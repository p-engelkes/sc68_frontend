import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {TeamComponent} from "../../../components/team/team.component";
import {FakeTeamService} from "../spec.utils";
import {TeamService} from "../../../services/team.service";
import {By} from "@angular/platform-browser";
describe('Team Component', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamComponent],
      providers: [
        {provide: TeamService, useClass: FakeTeamService}
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
  });

  it('should have 2 cards with teams', () => {
    fixture.detectChanges();
    let cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(2);
  });
});
