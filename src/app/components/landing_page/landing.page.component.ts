import {Component, ViewChild} from "@angular/core";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
declare var jQuery: any;
@Component({
  selector: 'landing-page-component',
  templateUrl: 'landing.page.component.html',
  styleUrls: ['landing.page.component.scss']
})
export class LandingPageComponent {
  @ViewChild('logInModal') logInModal: LoginComponent;
  @ViewChild('registerModal') registerModal: RegisterComponent;

  openLoginModal() {
    jQuery('#login_modal').modal('open');
    this.logInModal.focusableField.focus();
  }

  openRegisterModal() {
    jQuery('#register_modal').modal('open');
    this.registerModal.focusableField.focus();
  }
}
