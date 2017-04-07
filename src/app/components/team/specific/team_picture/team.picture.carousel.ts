/**
 * Created by pengelkes on 07.04.2017.
 */
import {Component, Input} from "@angular/core";
import {Picture} from "../../../../models/profile.picture";
@Component({
  selector: 'team-picture-carousel-component',
  templateUrl: './team.picture.carousel.html',
  styleUrls: ['./team.picture.carousel.scss']
})
export class TeamPictureCarouselComponent {
  @Input()
  teamPictures: Picture[]
}
