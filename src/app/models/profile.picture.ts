/**
 * Created by patrickengelkes on 04/01/2017.
 */
export class ProfilePicture {
  public userId: number;
  public picture: string;
  public width: number;
  public height: number;
  public ratio: number;

  static get(json): ProfilePicture {
    let profilePicture = new ProfilePicture();
    profilePicture.userId = json.userId;
    profilePicture.picture = json.picture;
    profilePicture.width = json.width;
    profilePicture.height = json.height;
    profilePicture.ratio = json.ratio;

    return profilePicture;
  }
}
