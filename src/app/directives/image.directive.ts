/**
 * Created by pengelkes on 29.12.2016.
 */
import {Directive, Input, ElementRef, OnInit} from "@angular/core";
import {User} from "../models/user";

@Directive({
  selector: '[profile-image]',
})
export class ProfileImageDirective extends OnInit {
  @Input('profile-image') user: User;
  private element: ElementRef;

  constructor(element: ElementRef) {
    super();
    this.element = element;
  }

  ngOnInit() {
    this.element.nativeElement.src = 'data:image/png;base64,' + this.user.profilePicture;
  }
}
