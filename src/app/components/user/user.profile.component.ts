/**
 * Created by pengelkes on 09.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import "rxjs/add/operator/switchMap";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
import {DataService} from "../../services/data.service";
import {NavBarService} from "../../services/navbar.service";
@Component({
  selector: 'user-profile',
  templateUrl: 'user.profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user: User;

  async ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    try {
      this.user = await this.userService.findById(id);
      this.navbarService.changeTitle(this.user.getNavigationTitle())
    } catch (error) {
      console.log(error);
    }
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private navbarService: NavBarService) {
  }

  isCurrentUser() {
    return this.user.id == LocalStorage.getCurrentUserId();
  }

  editUserProfile() {
    let currentUserId = LocalStorage.getCurrentUserId();
    this.router.navigate(['/user', +currentUserId, 'edit'])
  }
}
