/**
 * Created by pengelkes on 07.04.2017.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery;
@Directive({
  selector: '[materialboxed-directive]'
})
export class MaterialBoxedDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery('.materialboxed').materialbox();
    }, 100)
  }
}
