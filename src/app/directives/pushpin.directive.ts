import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[push-pin-directive]'
})
export class PushPinDirective extends OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    super();
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
