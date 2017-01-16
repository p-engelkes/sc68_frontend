/**
 * Created by pengelkes on 21.12.2016.
 */
import {Component, Input} from "@angular/core";
@Component({
  selector: 'property',
  template: `
    <div class="row" *ngIf=propertyValue>
        <div class="col s4 propertyLabel">{{propertyLabel}}:</div>
        <div class="col s4 propertyValue">{{propertyValue}}</div>
      </div>
`
})
export class PropertyComponent {
  @Input() propertyValue: string;
  @Input() propertyLabel: string;
}
