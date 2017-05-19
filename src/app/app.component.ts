import {Component, OnInit} from "@angular/core";
import {LocalStorage} from "./helper/LocalStorage";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  public options = {
    position: ["top", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    animate: "fromRight",
    clickToClose: true,
    pauseOnHover: true,
    showProgressBar: false
  };

  ngOnInit(): void {
    this.isLoggedIn = !!LocalStorage.getToken();
  }
}
