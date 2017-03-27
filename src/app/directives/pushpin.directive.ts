import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[push-pin-directive]'
})
export class PushPinDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery('.toc-wrapper').pushpin({
        top: 150,
        offset: 0
      })
    }, 100)
  }

}
