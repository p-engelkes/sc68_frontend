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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TeamComponent,
    UserProfileComponent,
    TeamComponent,
    MaterializeDropdown
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
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
