import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {ModuleWithProviders} from "@angular/core";
import {TeamsComponent} from "./components/team/general/teams.component";
import {UserProfileComponent} from "./components/user/user.profile.component";
import {EditUserProfileComponent} from "./components/user/edit.user.profile.component";
import {UserProfileParentComponent} from "./components/user/user.profile.parent.component";
import {ArticlesComponent} from "./components/article/general/articles.component";
import {ArticlesParentComponent} from "./components/article/general/articles.parent.component";
import {TeamsParentComponent} from "./components/team/general/teams.parent.component";
import {TeamComponent} from "./components/team/specific/team.component";
import {ManageTeamComponent} from "./components/team/general/manage.team.component";
import {ManagePicturesComponent} from "./components/ui/pictures/manage_pictures/manage.pictures.component";
import {TeamParentComponent} from "./components/team/specific/team.parent.component";
import {ManageArticleComponent} from "./components/article/general/manage.article.component";
import {ArticleParentComponent} from "./components/article/specific/article.parent.component";
import {ArticleComponent} from "./components/article/specific/article.component";
import {ManageUserProfilePictureComponent} from "./components/user/manage.user.profile.picture";
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
            path: 'manage_pictures',
            component: ManagePicturesComponent
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
      },
      {
        path: 'manage_picture',
        component: ManageUserProfilePictureComponent
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
      },
      {
        path: 'add',
        component: ManageArticleComponent
      },
      {
        path: ':id',
        component: ArticleParentComponent,
        children: [
          {
            path: '',
            component: ArticleComponent
          },
          {
            path: 'edit',
            component: ManageArticleComponent
          },
          {
            path: 'manage_pictures',
            component: ManagePicturesComponent
          }
        ]
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
