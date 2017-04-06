import {Observable} from "rxjs";
import {Article} from "../../models/article";
import {DebugElement, EventEmitter} from "@angular/core";
import {Position, User} from "../../models/user";
import {By} from "@angular/platform-browser";
import {Team, TrainingTimes} from "../../models/team";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Response, ResponseOptions} from "@angular/http";
import {OldClass} from "../../models/old.class";
import "rxjs/add/operator/toPromise";

let trainingTimesOne = new TrainingTimes("Friday", "19:00");
let trainingTimes2 = new TrainingTimes("Wednesday", "19:00");
let trainingTimes = [trainingTimesOne, trainingTimes2];
export let teamOne = new Team(1, "1. Mannschaft", trainingTimes);
export let teamTwo = new Team(2, "2. Mannschaft", trainingTimes);
let teamThree = new Team(3, "A-Junioren");

export let herrenOldClass = new OldClass(1, "Herren", 0, [teamOne, teamTwo]);
export let aYouthOldClass = new OldClass(2, "A-Junioren", 1, [teamThree]);


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

export let fakeArticleOne = new Article(undefined, '1', 'Content 1', user, undefined, teamOne, undefined, undefined);
export let fakeArticleTwo = new Article(undefined, '2', 'Content 2', undefined, undefined, teamOne, undefined, undefined);
export let fakeArticleThree = new Article(undefined, '3', 'Content 3', undefined, undefined, teamOne, undefined, undefined);
export let fakeArticleFour = new Article(undefined, '4', 'Content 4', undefined, undefined, teamTwo, undefined, undefined);

export class FakeLocalStorage {
  isArticleWriter() {
    return false;
  }
}

export class FakeLoginService {
  async logIn(email, password) {
  }

  async verifyToken(email) {
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
  async getAllTeams() {
    return [teamOne, teamTwo];
  }

  async findById(id) {
    return teamOne;
  }
}

export class FakeUserService {
  async getUser(id) {
    return user;
  }

  async getAllPositions() {
    return positions;
  }

  update(id, user) {
    return Observable.of(getResponse(JSON.stringify(user))).toPromise();
  }
}

export class FakeArticleService {
  async findAll() {
    return [fakeArticleOne, fakeArticleTwo];
  }

  getAllTeamsWithAnArticle() {
    return [teamOne, teamTwo];
  }

  findAllByTeam(teamId: number) {
    return [fakeArticleOne, fakeArticleTwo, fakeArticleThree];
  }

  getAddArticleEvent() {
    return new EventEmitter<Article>()
  }
}

export class FakeDataService extends DataService {
  user = user;
}

export class FakeRouter {
  public ne = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });

  navigate(commands: any[]) {
    return Observable.of(true)
  }
}

export class FakeRouterService {
  navigateTo(url) {
    return Observable.of(true).toPromise();
  }

  navigateToWithParameter(url, id) {
    return Observable.of(true).toPromise();
  }
}

export class FakeActivatedRoute extends ActivatedRoute {
  constructor() {
    super();
    this.snapshot = new ActivatedRouteSnapshot();
    this.snapshot.params = {id: 1};
  }
}

export class FakeNavBarService {
  changeTitle(newTitle: string) {
    return null;
  }

  getEmittedValue() {
    return new EventEmitter<any>()
  }
}

export class FakeOldClassService {
  findAllWithTeams() {
    return Observable.of(getResponse([herrenOldClass, aYouthOldClass]));
  }

  findAllWithTeamsAndArticles() {
    return Observable.of(getResponse([herrenOldClass, aYouthOldClass]));
  }
}

//has to run inside fakeAsync due to the use of tick()
export function setInputValue(debugElement: DebugElement, value: string, fixture) {
  fixture.detectChanges();

  let input = debugElement.nativeElement;
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

export function queryElement(css, fixture) {
  return fixture.debugElement.query(By.css(css));
}

export function queryAll(css, fixture) {
  return fixture.debugElement.queryAll(By.css(css));
}

export function clickOnElement(css, fixture) {
  let debugElement = queryElement(css, fixture);
  debugElement.triggerEventHandler('click', null);
}

export function checkRouterNavigation(fixture, fakeRouterService, css, url) {
  clickOnElement(css, fixture);

  fixture.detectChanges();
  fixture.whenStable().then(() => {
    expect(fakeRouterService.navigateTo).toHaveBeenCalledWith(url);
  })
}

function getResponse(object): Response {
  let options = new ResponseOptions();
  options.body = JSON.stringify(object);
  return new Response(options);
}
