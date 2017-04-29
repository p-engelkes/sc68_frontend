/**
 * Created by pengelkes on 29.04.2017.
 */
import {Component, NgZone, OnInit} from "@angular/core";
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgUploaderOptions} from "ngx-uploader";
import {LocalStorage} from "../../helper/LocalStorage";
import {apiUrl} from "../../services/helper.service";
import {NavBarService} from "../../services/navbar.service";
import {LocationService} from "../../services/location.service";
@Component({
  selector: 'manage-user-profile-component',
  templateUrl: './manage.user.profile.picture.html'
})
export class ManageUserProfilePictureComponent implements OnInit {
  private user: User;
  private zone: NgZone;
  private options: NgUploaderOptions;
  private sizeLimit = 2000000;
  private progress: number;
  private hasBaseDropZoneOver: boolean;
  private uploading: boolean;

  constructor(private userService: UserService,
              private navBarService: NavBarService,
              private locationService: LocationService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  async ngOnInit() {
    let snapshot = this.route.snapshot.parent;
    if (snapshot && snapshot.params['id']) {
      let id = +snapshot.params['id'];
      this.user = await this.userService.findById(id);
      console.log(this.user);
      this.zone = new NgZone({enableLongStackTrace: false});
      this.options = {
        url: apiUrl + '/profilePictures/' + LocalStorage.getCurrentUserId() + '/upload',
        authToken: LocalStorage.getToken(),
        authTokenPrefix: 'Bearer',
      }
    }

    this.navBarService.changeTitle("Profilbild bearbeiten");
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

  async deleteProfilePicture() {
    await this.userService.deleteProfilePicture(this.user.id);
    this.locationService.goBack();
  }


}
