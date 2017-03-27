/**
 * Created by patrickengelkes on 07/03/2017.
 */
import {Directive, OnInit, ElementRef} from "@angular/core";
declare var jQuery: any;

@Directive({
  selector: '[parallax-directive]'
})
export class ParallaxDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.element.nativeElement).parallax();
    }, 100)
  }
}
