/**
 * Created by pengelkes on 05.12.2016.
 */
import {Directive, ElementRef, EventEmitter, OnInit, Output} from "@angular/core";
declare var jQuery: any;

@Directive({
  selector: "[materialize-dropdown]",
  exportAs: 'materializeDropdown'
})
export class MaterializeDropdown implements OnInit {
  @Output() changeEvent: EventEmitter<number> = new EventEmitter();

  el: ElementRef;

  ngOnInit(): void {
    setTimeout(() => {
      jQuery(this.el.nativeElement).material_select();
      jQuery(this.el.nativeElement).on('change', (e, args) => {
        this.changeEvent.emit(jQuery(this.el.nativeElement).val());
      });
    }, 100)
  }

  constructor(el: ElementRef) {
    this.el = el;
  }
}
