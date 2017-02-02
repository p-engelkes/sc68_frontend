/**
 * Created by pengelkes on 09.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import "rxjs/add/operator/switchMap";
import {ActivatedRoute, Router} from "@angular/router";
import {LocalStorage} from "../../helper/LocalStorage";
@Component({
  selector: 'user-profile',
  templateUrl: 'user.profile.component.html'
})
export class UserProfileComponent extends OnInit {
  private user: User;

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.user = this.userService.getUser(id);
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    super()
  }

  isCurrentUser() {
    return this.user.id == LocalStorage.getCurrentUserId();
  }

  editUserProfile() {
    let currentUserId = LocalStorage.getCurrentUserId();
    this.router.navigate(['/user', +currentUserId, 'edit'])
  }
}
