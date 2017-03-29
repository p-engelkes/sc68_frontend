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
import {TeamsComponent} from "./components/team/general/teams.component";
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
import {OldClassService} from "./services/old.class.service";
import {TeamsParentComponent} from "./components/team/general/teams.parent.component";
import {TeamCardComponent} from "./components/team/specific/team.card.component";
import {TeamComponent} from "./components/team/specific/team.component";
import {SeasonTableComponent} from "./components/statistics/season.table.component";
import {SeasonTableTeamService} from "./services/season.table.service";
import {TabsDirective} from "./directives/tabs.directive";
import {PlayerTableComponent} from "./components/user/player.table.component";
import {GameTableComponent} from "./components/game/game.table.component";
import {GameService} from "./services/game.service";
import {PushPinDirective} from "./directives/pushpin.directive";
import {ScrollSpyDirective} from "./directives/scroll.spy.directive";
import {AddTeamComponent} from "./components/team/general/add.team.component";
import {EditTeamComponent} from "./components/team/specific/edit.team.component";
import {ManageTeamPicturesComponent} from "./components/team/specific/team_picture/manage.team.pictures.component";
import {TeamParentComponent} from "./components/team/specific/team.parent.component";

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
    TeamsParentComponent,
    TeamsComponent,
    AddTeamComponent,
    TeamParentComponent,
    TeamComponent,
    TeamCardComponent,
    EditTeamComponent,
    ManageTeamPicturesComponent,
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
    GameTableComponent,
    SideNavDirective,
    ParallaxDirective,
    TabsDirective,
    PushPinDirective,
    ScrollSpyDirective
  ],
  imports: [
    NgUploaderModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
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
    SeasonTableTeamService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
