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
@Component({
  selector: 'user-profile',
  templateUrl: 'user.profile.component.html'
})
export class UserProfileComponent extends OnInit {
  private user: User;

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.userService.getUser(id).subscribe(
      data => {
        let userResponse = JSON.parse(JSON.stringify(data))._body;
        let userJson = JSON.parse(userResponse);
        this.user = new User().deserialize(userJson);
        this.dataService.user = this.user;
      },
      error => console.log(error)
    )
  }

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService) {
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
