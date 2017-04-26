/**
 * Created by pengelkes on 07.04.2017.
 */
import {Component, Input} from "@angular/core";
import {Picture} from "../../../../models/profile.picture";
@Component({
  selector: 'picture-carousel-component',
  templateUrl: './picture.carousel.html',
  styleUrls: ['./picture.carousel.scss']
})
export class PictureCarouselComponent {
  @Input()
  pictures: Picture[]
}
