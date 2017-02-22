/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component, OnInit} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
import {RouterService} from "../../services/router.service";
import {NavBarService} from "../../services/navbar.service";
declare var jQuery: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;


  constructor(private loginService: LoginService,
              private routerService: RouterService,
              private router: Router,
              private navBarService: NavBarService) {
  }

  ngOnInit(): void {
    this.navBarService.getEmittedValue()
      .subscribe(newTitle => this.title = newTitle);
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

  currentUserName() {
    return LocalStorage.getCurrentUserName();
  }

  showUserProfile() {
    let currentUserId = LocalStorage.getCurrentUserId();
    this.router.navigate(['/user', +currentUserId])
  }
}
