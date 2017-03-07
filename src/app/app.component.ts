import {Component, OnInit} from "@angular/core";
import {LocalStorage} from "./helper/LocalStorage";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private isLoggedIn = false;

  ngOnInit(): void {
    this.isLoggedIn = !!LocalStorage.getToken();
  }
}
