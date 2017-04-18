/**
 * Created by pengelkes on 18.04.2017.
 */
import {Component, NgZone, OnInit} from "@angular/core";
import {Article} from "../../models/article";
import {NgUploaderOptions} from "ngx-uploader";
import {LocationService} from "../../services/location.service";
import {ArticleService} from "../../services/article.service";
import {NavBarService} from "../../services/navbar.service";
import {ActivatedRoute} from "@angular/router";
import {apiUrl} from "../../services/helper.service";
import {LocalStorage} from "../../helper/LocalStorage";
import {PictureService} from "../../services/picture.service";
@Component({
  selector: 'manage-article-pictures-component',
  templateUrl: './manage.article.pictures.component.html'
})
export class ManageArticlePictureComponents implements OnInit {
  private article: Article;
  private zone: NgZone;
  private options: NgUploaderOptions;
  private sizeLimit = 2000000;
  private progress: number;
  private uploading: boolean = false;
  private hasBaseDropZoneOver: boolean;
  private locationService: LocationService;

  constructor(private articleService: ArticleService,
              private pictureService: PictureService,
              private navBarService: NavBarService,
              private route: ActivatedRoute,
              locationService: LocationService) {
    this.locationService = locationService;
  }

  async ngOnInit() {
    let snapshot = this.route.snapshot.parent;
    if (snapshot && snapshot.params['id']) {
      let id = +snapshot.params['id'];
      this.article = await this.articleService.findById(id);
      await this.pictureService.findPicturesByArticle(this.article);

      this.zone = new NgZone({enableLongStackTrace: false});
      this.options = new NgUploaderOptions({
        url: apiUrl + '/articlePictures' + this.article.id + '/upload',
        authToken: LocalStorage.getToken(),
        authTokenPrefix: 'Bearer'
      });
    }

    this.navBarService.changeTitle('Bilder verwalten');
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

  async deleteArticlePicture(pictureId: number, arrayIndex: number) {
    await this.pictureService.deleteArticlePicture(pictureId);
    this.article.articlePictures = this.article.articlePictures.filter(picture => picture.id != pictureId)
  }
}
