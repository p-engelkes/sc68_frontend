/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private notificationManagementService: NotificationService) {
    notificationManagementService.notify()
  }
}
