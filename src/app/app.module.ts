import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./components/login/login.component";
import {LoginService} from "./services/login.service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {RegisterComponent} from "./components/register/register.component";
import {RegisterService} from "./services/register.service";
import {HomeComponent} from "./components/home/home.component";
import {routing} from "./app.routing";
import {TeamsComponent} from "./components/team/teams.component";
import {TeamService} from "./services/team.service";
import {MaterializeDropdown} from "./directives/select.directive";
import {UserProfileComponent} from "./components/user/user.profile.component";
import {UserService} from "./services/user.service";
import {PropertyComponent} from "./components/ui/property.component";
import {EditUserProfileComponent} from "./components/user/edit.user.profile.component";
import {UserProfileParentComponent} from "./components/user/user.profile.parent.component";
import {DataService} from "./services/data.service";
import {EditInputFieldComponent} from "./components/ui/edit.input.field.component";
import {NgUploaderModule} from "ngx-uploader";
import {ProfileImageDirective} from "./directives/image.directive";
import {ArticleService} from "./services/article.service";
import {ArticlesComponent} from "./components/article/articles.component";
import {ArticleComponent} from "./components/article/article.component";
import {UserChipComponent} from "./components/user/user.chip.component";
import {RouterService} from "./services/router.service";
import {SideNavDirective} from "./directives/navbar.directive";
import {NavBarService} from "./services/navbar.service";
import {ArticlesParentComponent} from "./components/article/articles.parent.component";
import {EditTextAreaComponent} from "./components/ui/edit.textarea.component";
import {NewArticleComponent} from "./components/article/new.article.component";
import {LandingPageComponent} from "./components/landing_page/landing.page.component";
import {ParallaxDirective} from "./directives/parallax.directive";
import {Angular2FontAwesomeModule} from "angular2-font-awesome/angular2-font-awesome";
import {OldClassService} from "./services/old.class.service";
import {TeamParentComponent} from "./components/team/team.parent.component";
import {TeamCardComponent} from "./components/team/team.card.component";
import {TeamComponent} from "./components/team/team.component";
import {SeasonTableComponent} from "./components/statistics/season.table.component";
import {SeasonTableTeamService} from "./services/seaon.table.service";
import {PlayerTableComponent} from "./components/user/player.table.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TeamsComponent,
    UserProfileParentComponent,
    UserProfileComponent,
    PlayerTableComponent,
    EditUserProfileComponent,
    TeamParentComponent,
    TeamCardComponent,
    TeamsComponent,
    TeamComponent,
    PropertyComponent,
    EditInputFieldComponent,
    EditTextAreaComponent,
    MaterializeDropdown,
    ProfileImageDirective,
    ArticlesParentComponent,
    NewArticleComponent,
    ArticlesComponent,
    ArticleComponent,
    UserChipComponent,
    LandingPageComponent,
    SeasonTableComponent,
    SideNavDirective,
    ParallaxDirective
  ],
  imports: [
    NgUploaderModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    Angular2FontAwesomeModule
  ],
  providers: [
    LoginService,
    RegisterService,
    TeamService,
    UserService,
    ArticleService,
    DataService,
    RouterService,
    NavBarService,
    OldClassService,
    SeasonTableTeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
