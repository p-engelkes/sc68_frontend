/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component, OnInit} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
import {RouterService} from "../../services/router.service";
import {NavBarService} from "../../services/navbar.service";
import {OldClassService} from "../../services/old.class.service";
import {OldClass} from "../../models/old.class";
declare var jQuery: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title: string;
  oldClassesWithAnArticle: OldClass[];
  oldClassesWithTeam: OldClass[];
  routerService: RouterService;
  loginService: LoginService;

  async ngOnInit() {
    try {
      this.oldClassesWithAnArticle = await this.oldClassService.findAllWithTeamsAndArticles();
      this.oldClassesWithTeam = await this.oldClassService.findAllWithTeams();
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logOut();
      location.reload();
    }
  }

  constructor(private router: Router,
              private navBarService: NavBarService,
              private oldClassService: OldClassService,
              loginService: LoginService,
              routerService: RouterService) {
    this.routerService = routerService;
    this.loginService = loginService;
    this.navBarService.getEmittedValue()
      .subscribe(newTitle => {
        console.log('changeTitle called');
        this.title = newTitle;
      });

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

  showArticlesForTeam(teamId: number) {
    this.router.navigate(['/articles/team', teamId])
  }

  showAllTeams() {
    this.router.navigate(['/teams']);
  }

  showTeamPage(teamId: number) {
    this.router.navigate(['/teams', teamId])
  }
}
