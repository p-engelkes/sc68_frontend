/**
 * Created by pengelkes on 29.12.2016.
 */
import {Component} from "@angular/core";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {User} from "../../models/user";
@Component({
  selector: 'edit-user-profile',
  templateUrl: './edit.user.profile.component.html'
})
export class EditUserProfileComponent {
  private user: User;

  constructor(private userService: UserService,
              private dataService: DataService) {
    this.user = dataService.user;
  }
}
