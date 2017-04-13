/**
 * Created by pengelkes on 13.04.2017.
 */
import {Injectable} from "@angular/core";
import {Location} from "@angular/common";
@Injectable()
export class LocationService {

  constructor(private location: Location) {
  }

  goBack() {
    this.location.back();
  }
}
