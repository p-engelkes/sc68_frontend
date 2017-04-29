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
import {DropdownDirective} from "./directives/dropdown.directive";
import {UserProfileComponent} from "./components/user/user.profile.component";
import {UserService} from "./services/user.service";
import {PropertyComponent} from "./components/ui/property.component";
import {EditUserProfileComponent} from "./components/user/edit.user.profile.component";
import {UserProfileParentComponent} from "./components/user/user.profile.parent.component";
import {DataService} from "./services/data.service";
import {EditInputFieldComponent} from "./components/ui/input_fields/edit_input_field/edit.input.field.component";
import {NgUploaderModule} from "ngx-uploader";
import {ProfileImageDirective} from "./directives/image.directive";
import {ArticleService} from "./services/article.service";
import {ArticlesComponent} from "./components/article/general/articles.component";
import {ArticleCardComponent} from "./components/article/specific/article.card.component";
import {UserChipComponent} from "./components/user/user.chip.component";
import {RouterService} from "./services/router.service";
import {SideNavDirective} from "./directives/navbar.directive";
import {NavBarService} from "./services/navbar.service";
import {ArticlesParentComponent} from "./components/article/general/articles.parent.component";
import {EditTextAreaComponent} from "./components/ui/input_fields/edit_textarea_component/edit.textarea.component";
import {ManageArticleComponent} from "./components/article/general/manage.article.component";
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
import {ManageTeamComponent} from "./components/team/general/manage.team.component";
import {ManagePicturesComponent} from "./components/ui/pictures/manage_pictures/manage.pictures.component";
import {TeamParentComponent} from "./components/team/specific/team.parent.component";
import {AddTrainingTimeComponent} from "./components/team/general/add.training.time.component";
import {ValidateInputDirective} from "./directives/validate.input.directive";
import {CarouselDirective} from "./directives/carousel.directive";
import {MaterialBoxedDirective} from "./directives/materialboxed.directive";
import {PictureCarouselComponent} from "./components/ui/pictures/picture_carousel/picture.carousel";
import {ModalDirective} from "./directives/modal.directive";
import {LocationService} from "./services/location.service";
import {CollapsibleDirective} from "./directives/collapsible.directive";
import {PictureService} from "./services/picture.service";
import {ArticleParentComponent} from "./components/article/specific/article.parent.component";
import {ArticleComponent} from "./components/article/specific/article.component";
import {ManageUserProfilePictureComponent} from "./components/user/manage.user.profile.picture";


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
    ManageUserProfilePictureComponent,
    TeamsParentComponent,
    TeamsComponent,
    ManageTeamComponent,
    AddTrainingTimeComponent,
    TeamParentComponent,
    TeamComponent,
    PictureCarouselComponent,
    TeamCardComponent,
    ManagePicturesComponent,
    PropertyComponent,
    EditInputFieldComponent,
    EditTextAreaComponent,
    DropdownDirective,
    ProfileImageDirective,
    ArticlesParentComponent,
    ManageArticleComponent,
    ArticlesComponent,
    ArticleParentComponent,
    ArticleComponent,
    ArticleCardComponent,
    UserChipComponent,
    LandingPageComponent,
    SeasonTableComponent,
    GameTableComponent,
    SideNavDirective,
    ParallaxDirective,
    TabsDirective,
    PushPinDirective,
    ScrollSpyDirective,
    ValidateInputDirective,
    CarouselDirective,
    MaterialBoxedDirective,
    ModalDirective,
    CollapsibleDirective
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
    GameService,
    LocationService,
    PictureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
