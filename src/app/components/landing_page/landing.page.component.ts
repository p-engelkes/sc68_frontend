import {Component} from "@angular/core";
declare var jQuery: any;
@Component({
  selector: 'landing-page-component',
  templateUrl: 'landing.page.component.html',
  styleUrls: ['landing.page.component.scss']
})
export class LandingPageComponent {

  openLoginModal() {
    jQuery('#login_modal').openModal();
  }
}
