/**
 * Created by patrickengelkes on 21/02/2017.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[side-nav]'
})
export class SideNavDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.element.nativeElement).sideNav({
        menuWidth: 320,
        edge: 'left',
        closeOnClick: false,
        draggable: true
      });
    }, 100)
  }
}
