/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private loginService: LoginService) {
  }

  logout() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logOut();
    }
  }
}
