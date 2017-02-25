/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component, OnInit} from "@angular/core";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
import {RouterService} from "../../services/router.service";
import {NavBarService} from "../../services/navbar.service";
import {ArticleService} from "../../services/article.service";
import {Team} from "../../models/team";
declare var jQuery: any;
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title: string;
  teamsWithAnArticle: Team[];

  constructor(private loginService: LoginService,
              private routerService: RouterService,
              private router: Router,
              private navBarService: NavBarService,
              private articleService: ArticleService) {
    this.articleService.getAllTeamsWithAnArticle().subscribe(
      data => this.teamsWithAnArticle = Team.getTeamsFromJson(data),
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

  showAllArticles() {
    this.router.navigate(['/articles']);
  }

  showArticlesForTeam(team: Team) {
    this.router.navigate(['/articles/team', team.id])
  }
}
