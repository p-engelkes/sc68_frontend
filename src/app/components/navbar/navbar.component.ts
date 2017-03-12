/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component, OnInit} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
import {RouterService} from "../../services/router.service";
import {NavBarService} from "../../services/navbar.service";
import {Team} from "../../models/team";
import {OldClassService} from "../../services/old.class.service";
import {OldClass} from "../../models/old.class";
declare var jQuery: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;
  oldClassesWithAnArticle: OldClass[];

  constructor(private loginService: LoginService,
              private routerService: RouterService,
              private router: Router,
              private navBarService: NavBarService,
              private oldClassService: OldClassService) {

    this.oldClassService.findAll().subscribe(
      data => this.oldClassesWithAnArticle = OldClass.getOldClassesFromJson(data),
      error => console.log(error)
    );
  }

  ngOnInit(): void {
    this.navBarService.getEmittedValue()
      .subscribe(newTitle => this.title = newTitle);
  }

  logout() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logOut();
      location.reload();
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
    if (LocalStorage.getCurrentUserName()) {
      return LocalStorage.getCurrentUserName();
    } else {
      return LocalStorage.getCurrentEmail();
    }
  }

  showUserProfile() {
    let currentUserId = LocalStorage.getCurrentUserId();
    this.router.navigate(['/user', +currentUserId])
  }

  showAllArticles() {
    this.router.navigate(['/articles']);
  }

  showArticlesForTeam(team: Team) {
    this.router.navigate(['/articles/team', team.id])
  }
}
