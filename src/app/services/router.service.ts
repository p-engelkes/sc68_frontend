import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
@Injectable()
export class RouterService {
  constructor(private router: Router) {
  }

  navigateTo(url) {
    this.router.navigate([url])
  }

  navigateToWithParameter(url, id) {
    this.router.navigate([url, id]);
  }
}
