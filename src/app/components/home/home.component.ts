/**
 * Created by pengelkes on 30.11.2016.
 */
import {Component} from "@angular/core";
import {FlashMessage} from "../../flash_messages/flash.message";
@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private flashMessage: FlashMessage) {
  }
}
