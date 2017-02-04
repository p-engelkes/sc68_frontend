import {Observable} from "rxjs";
import {Article} from "../../models/Article";
import {DebugElement} from "@angular/core";
import {tick} from "@angular/core/testing";
import {User, Position} from "../../models/user";
import {By} from "@angular/platform-browser";
import {Team, TrainingTimes} from "../../models/team";
import {ActivatedRoute, ActivatedRouteSnapshot} from "@angular/router";
import {DataService} from "../../services/data.service";

let trainingTimesOne = new TrainingTimes("Friday", "19:00");
let trainingTimes2 = new TrainingTimes("Wednesday", "19:00");
let trainingTimes = [trainingTimesOne, trainingTimes2];
export let teamOne = Team.create().setId(1).setName("1. Mannschaft").setTrainingTimes(trainingTimes);
export let teamTwo = Team.create().setId(2).setName("2. Mannschaft").setTrainingTimes(trainingTimes);

export let user = User.create()
  .setId(1)
  .setUserName('pengelkes')
  .setTeam(teamOne)
  .setFirstName('Patrick')
  .setLastName('Engelkes')
  .setBackNumber(8)
  .setPassword('password');

let positionOne = new Position('position1');
let positionTwo = new Position('position2');
let positions = [positionOne, positionTwo];

export let fakeArticleOne = Article.create().setTitle('1').setContent('Content 1').setAuthor(user);
export let fakeArticleTwo = Article.create().setTitle('2').setContent('Content 2');

export class FakeLoginService {
  logIn(email, password) {
    return Observable.of(JSON.stringify(email));
  }

  verifyToken(email) {
    return Observable.of(JSON.stringify(email));
  }

  isLoggedIn() {
    return true;
  }
}

export class FakeRegisterService {
  register(user: User) {
    return Observable.of(JSON.stringify(user));
  }
}

export class FakeTeamService {
  getAllTeams(): Team[] {
    return [teamOne, teamTwo];
  }
}

export class FakeUserService {
  getUser(id) {
    return user;
  }

  getAllPositions() {
    return positions;
  }

  update(id, user) {
    return Observable.of(JSON.stringify(user));
  }
}

export class FakeArticleService {
  findAll() {
    return [fakeArticleOne, fakeArticleTwo];
  }
}

export class FakeDataService extends DataService {
  user = user;
}

export class FakeRouter {
  navigate(commands: any[]) {
    return Observable.of(true)
  }
}

export class FakeRouterService {
  navigate(url) {
    return Observable.of(true);
  }
}

export class FakeActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.snapshot = new ActivatedRouteSnapshot();
    this.snapshot.params = Observable.of({id: "1"});
  }
}

//has to run inside fakeAsync due to the use of tick()
export function setInputValue(debugElement: DebugElement, value: string, fixture) {
  fixture.detectChanges();
  tick();

  let input = debugElement.nativeElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
  tick();
}

export function queryElement(css, fixture) {
  return fixture.debugElement.query(By.css(css));
}

export function clickOnElement(css, fixture) {
  let debugElement = queryElement(css, fixture);
  debugElement.triggerEventHandler('click', null);
}

export function checkRouterNavigation(fixture, fakeRouterService, css, url) {
  clickOnElement(css, fixture);

  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(fakeRouterService.navigate).toHaveBeenCalledWith(url);
  })
}
