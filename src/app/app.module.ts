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
import {PropertyComponent} from "./components/user/property.component";
import {EditUserProfileComponent} from "./components/user/edit.user.profile.component";
import {UserProfileParentComponent} from "./components/user/user.profile.parent.component";
import {DataService} from "./services/data.service";
import {EditPropertyComponent} from "./components/user/edit.property.component";
import {NgFileSelectDirective, NgUploaderService} from "ngx-uploader";
import {ProfileImageDirective} from "./directives/image.directive";

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
    EditPropertyComponent,
    MaterializeDropdown,
    ProfileImageDirective,
    NgFileSelectDirective
  ],
  imports: [
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
    DataService,
    NgUploaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
