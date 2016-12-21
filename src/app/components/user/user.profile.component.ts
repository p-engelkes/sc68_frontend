/**
 * Created by pengelkes on 09.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import "rxjs/add/operator/switchMap";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'user-profile',
  templateUrl: 'user.profile.component.html'
})
export class UserProfileComponent extends OnInit {
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.userService.getUser(id).subscribe(
      data => {
        let userResponse = JSON.parse(JSON.stringify(data))._body;
        let userJson = JSON.parse(userResponse);
        this.user = new User().deserialize(userJson);
      },
      error => console.log(error)
    )
  }

  private user: User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    super()
  }
}
