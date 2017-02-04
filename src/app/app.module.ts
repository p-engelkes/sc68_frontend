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
import {TeamComponent} from "./components/team/team.component";
import {TeamService} from "./services/team.service";
import {MaterializeDropdown} from "./directives/SelectDirective";
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
import {LatestArticlesComponent} from "./components/article/latest.articles.component";
import {ArticleComponent} from "./components/article/article.component";
import {UserChipComponent} from "./components/user/user.chip.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TeamComponent,
    UserProfileParentComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    TeamComponent,
    PropertyComponent,
    EditInputFieldComponent,
    MaterializeDropdown,
    ProfileImageDirective,
    LatestArticlesComponent,
    ArticleComponent,
    UserChipComponent
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
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
