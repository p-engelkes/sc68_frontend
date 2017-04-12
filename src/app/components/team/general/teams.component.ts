/**
 * Created by pengelkes on 02.12.2016.
 */
import {Component, OnInit} from "@angular/core";
import {OldClass} from "../../../models/old.class";
import {OldClassService} from "../../../services/old.class.service";
@Component({
  selector: 'team',
  templateUrl: './teams.component.html'
})
export class TeamsComponent implements OnInit{
  oldClasses: OldClass[];

  constructor(private oldClassService: OldClassService) {
  }

  async ngOnInit() {
    try {
      this.oldClasses = await this.oldClassService.findAllWithTeams()
    } catch (error) {
      console.log(error);
    }
  }
}
