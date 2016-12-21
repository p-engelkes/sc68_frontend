/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
declare var jQuery: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private loginService: LoginService,
              private router: Router) {
  }

  logout() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logOut();
    }
  }

  openLoginModal() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logOut();
    } else {
      jQuery('#login_modal').openModal();
    }
  }

  openRegisterModal() {
    jQuery('#register_modal').openModal();
  }

  showUserProfile() {
    let currentUserId = localStorage.getItem('currentUserId');
    this.router.navigate(['/user', +currentUserId])
  }
}
