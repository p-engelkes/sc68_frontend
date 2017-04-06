import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {TeamsComponent} from "./components/team/general/teams.component";
import {UserProfileComponent} from "./components/user/user.profile.component";
import {EditUserProfileComponent} from "./components/user/edit.user.profile.component";
import {UserProfileParentComponent} from "./components/user/user.profile.parent.component";
import {ArticlesComponent} from "./components/article/articles.component";
import {ArticlesParentComponent} from "./components/article/articles.parent.component";
import {TeamsParentComponent} from "./components/team/general/teams.parent.component";
import {TeamComponent} from "./components/team/specific/team.component";
import {ManageTeamComponent} from "./components/team/general/manage.team.component";
import {ManageTeamPicturesComponent} from "./components/team/specific/team_picture/manage.team.pictures.component";
import {TeamParentComponent} from "./components/team/specific/team.parent.component";
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
    component: RegisterComponent,
  },
  {
    path: 'logIn',
    component: LoginComponent
  },
  {
    path: 'teams',
    component: TeamsParentComponent,
    children: [
      {
        path: '',
        component: TeamsComponent,
      },
      {
        path: 'add',
        component: ManageTeamComponent
      },
      {
        path: ':id',
        component: TeamParentComponent,
        children: [
          {
            path: '',
            component: TeamComponent
          },
          {
            path: 'edit',
            component: ManageTeamComponent
          },
          {
            path: 'manage_team_pictures',
            component: ManageTeamPicturesComponent
          }
        ]
      }
    ]
  },
  {
    path: 'user/:id',
    component: UserProfileParentComponent,
    children: [
      {
        path: '',
        component: UserProfileComponent
      },
      {
        path: 'edit',
        component: EditUserProfileComponent
      }
    ]
  },
  {
    path: 'articles',
    component: ArticlesParentComponent,
    children: [
      {
        path: '',
        component: ArticlesComponent
      },
      {
        path: 'team/:id',
        component: ArticlesComponent
      },
      {
        path: 'author/:id',
        component: ArticlesComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
