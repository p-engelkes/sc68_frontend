/**
 * Created by pengelkes on 10.04.2017.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;
@Directive({
  selector: '[modal-directive]'
})
export class ModalDirective implements OnInit {
  private element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  ngOnInit(): void {
    jQuery('.modal').modal();
  }
}
