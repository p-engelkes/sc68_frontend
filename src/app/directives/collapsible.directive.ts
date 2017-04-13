/**
 * Created by pengelkes on 13.04.2017.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[collapsible-directive]'
})
export class CollapsibleDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.element.nativeElement).collapsible();
    }, 100)
  }
}
