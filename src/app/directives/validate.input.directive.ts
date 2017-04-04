/**
 * Created by patrickengelkes on 04/04/2017.
 */
import {Directive, ElementRef} from "@angular/core";
@Directive({
  selector: '[validate-input-directive]',
  exportAs: 'validate-input-directive'
})
export class ValidateInputDirective {
  private element: ElementRef;
  public validationClass: string = "validate";

  constructor(element: ElementRef) {
    this.element = element;
  }

  getClassList() {
    let classList = this.element.nativeElement.classList;

    if (classList) {
      if (classList.contains('ng-invalid')) {
        this.validationClass = 'validate invalid';
      } else if (classList.contains('ng-valid')) {
        this.validationClass = 'validate valid';
      }
    }

    return this.validationClass;
  }
}
