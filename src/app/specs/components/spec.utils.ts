import {Observable} from "rxjs";
import {Article} from "../../models/Article";
import {DebugElement, EventEmitter} from "@angular/core";
import {User, Position} from "../../models/user";
import {By} from "@angular/platform-browser";
import {Team, TrainingTimes} from "../../models/team";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd} from "@angular/router";
import {DataService} from "../../services/data.service";
import {Response, ResponseOptions} from "@angular/http";
import {tick} from "@angular/core/testing";
import {OldClass} from "../../models/old.class";

let trainingTimesOne = new TrainingTimes("Friday", "19:00");
let trainingTimes2 = new TrainingTimes("Wednesday", "19:00");
let trainingTimes = [trainingTimesOne, trainingTimes2];
export let teamOne = Team.create().setId(1).setName("1. Mannschaft").setTrainingTimes(trainingTimes);
export let teamTwo = Team.create().setId(2).setName("2. Mannschaft").setTrainingTimes(trainingTimes);
let teamThree = Team.create().setId(3).setName("A-Junioren");

export let herrenOldClass = OldClass.create().setId(1).setName('Herren').setOrderNumber(0).setTeams([teamOne, teamTwo]);
export let aYouthOldClass = OldClass.create().setId(2).setName('A-Junioren').setOrderNumber(1).setTeams([teamThree]);


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

export let fakeArticleOne = Article.create().setTitle('1').setContent('Content 1').setAuthor(user).setTeam(teamOne);
export let fakeArticleTwo = Article.create().setTitle('2').setContent('Content 2').setTeam(teamOne);
export let fakeArticleThree = Article.create().setTitle('3').setContent('Content 3').setTeam(teamOne);
export let fakeArticleFour = Article.create().setTitle('4').setContent('Content 4').setTeam(teamTwo);

export class FakeLocalStorage {
  isArticleWriter() {
    return false;
  }
}

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
  getAllTeams() {
    return Observable.of(getResponse([teamOne, teamTwo]));
  }

  findById(id) {
    return Observable.of(getResponse(teamOne))
  }
}

export class FakeUserService {
  getUser(id) {
    return Observable.of(getResponse(user));
  }

  getAllPositions() {
    return Observable.of(getResponse(positions));
  }

  update(id, user) {
    return Observable.of(JSON.stringify(user));
  }
}

export class FakeArticleService {
  findAll() {
    return Observable.of(getResponse([fakeArticleOne, fakeArticleTwo]));
  }

  getAllTeamsWithAnArticle() {
    return Observable.of(getResponse([teamOne, teamTwo]))
  }

  findAllByTeam(teamId: number) {
    return Observable.of(getResponse([fakeArticleOne, fakeArticleTwo, fakeArticleThree]))
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
    return Observable.of(true);
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
  findAll() {
    return Observable.of(getResponse([herrenOldClass, aYouthOldClass]));
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
    expect(fakeRouterService.navigateTo).toHaveBeenCalledWith(url);
  })
}

function getResponse(object): Response {
  let options = new ResponseOptions();
  options.body = JSON.stringify(object);
  return new Response(options);
}
