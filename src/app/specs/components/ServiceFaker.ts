import {Observable} from "rxjs";
import {Article} from "../../models/Article";

export let fakeArticleOne = Article.create().setTitle('1').setContent('Content 1');
export let fakeArticleTwo = Article.create().setTitle('2').setContent('Content 2');

export class FakeLoginService {
  logIn(email, password) {
    return Observable.of(JSON.stringify(email));
  }

  verifyToken(email) {
    return Observable.of(JSON.stringify(email));
  }
}
export class FakeArticleService {
  findAll() {
    return [fakeArticleOne, fakeArticleTwo];
  }
}
export class FakeRouter {
  navigate(commands: any[]) {
    return Observable.of(true)
  }
}
