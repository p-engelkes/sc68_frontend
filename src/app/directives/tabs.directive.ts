import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[tabs-directive]'
})
export class TabsDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.element.nativeElement).tabs({
        swipeable: true
      });
    }, 100)
  }
}
