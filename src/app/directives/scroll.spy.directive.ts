import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[scroll-spy-directive]'
})
export class ScrollSpyDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.element.nativeElement).scrollSpy();
    }, 100)
  }
}
