/**
 * Created by pengelkes on 29.12.2016.
 */
import {Directive, ElementRef, Input, OnInit} from "@angular/core";

@Directive({
  selector: '[image]',
})
export class ProfileImageDirective implements OnInit {
  @Input('image-data') data: string;
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit() {
    this.element.nativeElement.src = 'data:image/png;base64,' + this.data;
  }
}
