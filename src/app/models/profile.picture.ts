/**
 * Created by patrickengelkes on 04/01/2017.
 */
export class ProfilePicture {
  public userId: number;
  public data: string;
  public width: number;
  public height: number;
  public ratio: number;

  static get(json): ProfilePicture {
    let profilePicture = new ProfilePicture();
    profilePicture.userId = json.userId;
    profilePicture.data = json.picture;
    profilePicture.width = json.width;
    profilePicture.height = json.height;
    profilePicture.ratio = json.ratio;

    return profilePicture;
  }
}

export class Picture {
  public id: number;
  public data: string;
  public width: number;
  public height: number;
  public ratio: number;

  static get(json: any): Picture {
    let picture = new Picture();
    picture.id = json.id;
    picture.data = json.picture;
    picture.width = json.width;
    picture.height = json.height;
    picture.ratio = json.ratio;

    return picture;
  }

  static getAll(json: any): Picture[] {
    let pictures: Picture[] = [];

    for (let i = 0; i < json.length; i++) {
      let pictureJson = json[i];
      let picture = Picture.get(pictureJson);
      pictures.push(picture);
    }

    return pictures;
  }
}
