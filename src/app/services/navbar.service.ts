/**
 * Created by patrickengelkes on 21/02/2017.
 */
import {Injectable, Output, EventEmitter} from "@angular/core";
@Injectable()
export class NavBarService {
  @Output() fire: EventEmitter<any> = new EventEmitter();

  changeTitle(newTitle: string) {
    this.fire.emit(newTitle);
  }

  getEmittedValue() {
    return this.fire;
  }
}
