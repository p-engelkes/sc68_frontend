/**
 * Created by pengelkes on 09.12.2016.
 */
import {Component} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'user-profile',
  templateUrl: 'user.profile.component.html'
})
export class UserProfileComponent {

  private user: User;

  constructor(private userService: UserService) {
    userService.getUser().subscribe(
      data => {
        let userResponse = JSON.parse(JSON.stringify(data))._body;
        console.log(userResponse);
        let userJson = JSON.parse(userResponse);
        console.log(userJson);
        this.user = new User().deserialize(userJson);
      },
      error => console.log(error)
    )
  }
}
