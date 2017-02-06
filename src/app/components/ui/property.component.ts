/**
 * Created by pengelkes on 21.12.2016.
 */
import {Component, Input} from "@angular/core";
@Component({
  selector: 'property',
  template: `
    <div class="row">
        <div class="col s4 propertyLabel">{{propertyLabel}}:</div>
        <div class="col s4 propertyValue" *ngIf=propertyValue >{{propertyValue}}</div>
      </div>
`
})
export class PropertyComponent {
  @Input() propertyValue: string;
  @Input() propertyLabel: string;
}
