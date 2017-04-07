import {Component, NgZone, OnInit} from "@angular/core";
import {NgUploaderOptions} from "ngx-uploader";
import {apiUrl} from "../../../../services/helper.service";
import {Team} from "../../../../models/team";
import {LocalStorage} from "../../../../helper/LocalStorage";
import {ActivatedRoute} from "@angular/router";
import {TeamService} from "../../../../services/team.service";
@Component({
  selector: 'manage-team-pictures-component',
  templateUrl: './manage.team.pictures.component.html',
  styleUrls: ['./manage.team.pictures.component.scss']
})
export class ManageTeamPicturesComponent implements OnInit {
  private team: Team;
  private zone: NgZone;
  private options: NgUploaderOptions;
  private sizeLimit = 2000000;
  private progress: number;
  private uploading: boolean = false;
  private hasBaseDropZoneOver: boolean;

  constructor(private teamService: TeamService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    let snapshot = this.route.snapshot.parent;
    if (snapshot && snapshot.params['id']) {
      let id = +snapshot.params['id'];
      this.team = await this.teamService.findById(id);
      await this.teamService.findPicturesByTeam(this.team);

      this.zone = new NgZone({enableLongStackTrace: false});
      this.options = new NgUploaderOptions({
        url: apiUrl + '/teamPictures/' + this.team.id + '/upload',
        authToken: LocalStorage.getToken(),
        authTokenPrefix: 'Bearer'
      });
    }
  }

  handleUpload(data): void {
    setTimeout(() => {
      this.zone.run(() => {
        this.progress = +data.progress.percent;
        if (data && data.response) {
          this.uploading = false;
          location.reload();
        }
      });
    });
  }

  beforeUpload(uploadingFile): void {
    this.uploading = true;
    if (uploadingFile.size > this.sizeLimit) {
      this.uploading = false;
      uploadingFile.setAbort();
      alert('File is too large');
    }
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  async deleteTeamPicture(pictureId: number, arrayIndex: number) {
    await this.teamService.deletePicture(pictureId);
    this.team.teamPictures = this.team.teamPictures.filter(picture => picture.id != pictureId)
  }
}
