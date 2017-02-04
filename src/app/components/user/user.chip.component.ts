import {Component, Input} from "@angular/core";
import {User} from "../../models/user";
import {RouterService} from "../../services/router.service";
@Component({
  selector: 'user-chip',
  templateUrl: './user.chip.component.html'
})
export class UserChipComponent {
  @Input()
  user: User;

  constructor(private routerService: RouterService) {
  }

  showUserProfile(userId: number) {
    this.routerService.navigateToWithParameter('/user', userId);
  }
}
