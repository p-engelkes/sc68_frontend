/**
 * Created by patrickengelkes on 21/02/2017.
 */
import {Directive, OnInit, ElementRef} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[side-nav]'
})
export class SideNavDirective extends OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    super();
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.element.nativeElement).sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: false,
        draggable: true
      });
      jQuery(this.element.nativeElement).collapsible();
    }, 100)
  }
}
