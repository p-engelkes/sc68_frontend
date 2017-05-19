import {Component, NgZone, OnInit} from "@angular/core";
import {NgUploaderOptions} from "ngx-uploader";
import {Team} from "../../../../models/team";
import {ActivatedRoute, Router} from "@angular/router";
import {TeamService} from "../../../../services/team.service";
import {NavBarService} from "../../../../services/navbar.service";
import {LocationService} from "../../../../services/location.service";
import {PictureService} from "../../../../services/picture.service";
import {apiUrl} from "../../../../services/helper.service";
import {LocalStorage} from "../../../../helper/LocalStorage";
import {PictureClass} from "../../FormEnums";
import {Article} from "../../../../models/article";
import {ArticleService} from "../../../../services/article.service";
import {Notification, NotificationService, NotificationType} from "../../../../services/notification.service";
@Component({
  selector: 'manage-team-pictures-component',
  templateUrl: './manage.pictures.component.html'
})
export class ManagePicturesComponent implements OnInit {
  private team: Team;
  private article: Article;
  private zone: NgZone;
  private options: NgUploaderOptions;
  private sizeLimit = 2000000;
  private progress: number;
  private uploading: boolean = false;
  private hasBaseDropZoneOver: boolean;
  private locationService: LocationService;
  private pictureClass: PictureClass;

  constructor(private teamService: TeamService,
              private articleService: ArticleService,
              private pictureService: PictureService,
              private navBarService: NavBarService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              locationService: LocationService) {
    this.locationService = locationService;
  }

  async ngOnInit() {
    this.notificationService.notify();
    let url = this.router.url;
    if (url.indexOf("teams") != -1) {
      this.pictureClass = PictureClass.TEAM;
    } else if (url.indexOf("articles") != -1) {
      this.pictureClass = PictureClass.ARTICLE;
    }

    let snapshot = this.route.snapshot.parent;
    if (snapshot && snapshot.params['id']) {
      let id = +snapshot.params['id'];
      this.zone = new NgZone({enableLongStackTrace: false});
      let urlName = "";
      let pictureClassId;
      if (this.pictureClass === PictureClass.TEAM) {
        this.team = await this.teamService.findById(id);
        await this.pictureService.findPicturesByTeam(this.team);
        urlName = "teamPictures";
        pictureClassId = this.team.id;
      }
      if (this.pictureClass === PictureClass.ARTICLE) {
        this.article = await this.articleService.findById(id);
        await this.pictureService.findPicturesByArticle(this.article);
        urlName = "articlePictures";
        pictureClassId = this.article.id
      }

      this.options = new NgUploaderOptions({
        url: apiUrl + '/' + urlName + '/' + pictureClassId + '/upload',
        authToken: LocalStorage.getToken(),
        authTokenPrefix: 'Bearer'
      });

      this.navBarService.changeTitle("Bilder verwalten");
    }
  }

  handleUpload(data): void {
    setTimeout(() => {
      this.zone.run(() => {
        this.progress = +data.progress.percent;
        if (data && data.response) {
          this.uploading = false;
          this.notificationService.setNotification(new Notification("Bild erfolgreich hinzugefügt", NotificationType.SUCCESS));
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
      this.notificationService.showNotification(new Notification("Datei ist zu groß um hochgeladen zu werden", NotificationType.ERROR));
    }
  }

  fileOverBase(e: boolean) {
    this.hasBaseDropZoneOver = e;
  }

  async deletePicture(pictureId: number) {
    try {
      if (this.pictureClass === PictureClass.TEAM) {
        await this.pictureService.deleteTeamPicture(pictureId);
        this.team.teamPictures = this.team.teamPictures.filter(picture => picture.id != pictureId)
      } else if (this.pictureClass === PictureClass.ARTICLE) {
        await this.pictureService.deleteArticlePicture(pictureId);
        this.article.pictures = this.article.pictures.filter(picture => picture.id != pictureId)
      }

      this.notificationService.showNotification(new Notification("Bild erfolgreich gelöscht", NotificationType.SUCCESS));
    } catch (e) {
      this.notificationService.showNotification(new Notification("Bild konnte nicht gelöscht werden", NotificationType.ERROR));
    }
  }
}
