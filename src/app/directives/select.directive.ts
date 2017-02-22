/**
 * Created by pengelkes on 05.12.2016.
 */
import {Directive, ElementRef, OnInit} from "@angular/core";
declare var jQuery: any;

@Directive({
  selector: "[materialize-dropdown]"
})
export class MaterializeDropdown implements OnInit {
  el: ElementRef;

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.el.nativeElement).material_select();
    }, 100)
  }

  constructor(el: ElementRef) {
    this.el = el;
  }
}
