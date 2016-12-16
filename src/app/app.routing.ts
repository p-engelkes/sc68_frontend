import {Routes, RouterModule} from "@angular/router";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {TeamComponent} from "./components/team/team.component";
import {ChooseTeamComponent} from "./components/register/chooseTeam.component";
import {RegisterParentComponent} from "./components/register/registerParent.component";
import {UserProfileComponent} from "./components/user/user.profile.component";
/**
 * Created by pengelkes on 30.11.2016.
 */
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterParentComponent,
    children: [
      {
        path: '',
        component: RegisterComponent
      },
      {
        path: 'chooseTeam',
        component: ChooseTeamComponent
      }
    ]
  },
  {
    path: 'logIn',
    component: LoginComponent
  },
  {
    path: 'teams',
    component: TeamComponent
  },
  {
    path: 'user/profile',
    component: UserProfileComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
