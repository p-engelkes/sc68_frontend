/**
 * Created by patrickengelkes on 04/01/2017.
 */
export class ProfilePicture {
  public userId: number;
  public picture: string;
  public width: number;
  public height: number;
  public ratio: number;

  static create(): ProfilePicture {
    return new ProfilePicture();
  }

  public setUserId(userId: number): ProfilePicture {
    this.userId = userId;
    return this;
  }

  public setPicture(picture: string): ProfilePicture {
    this.picture = picture;
    return this;
  }

  public setWidth(width: number): ProfilePicture {
    this.width = width;
    return this;
  }

  public setHeight(height: number): ProfilePicture {
    this.height = height;
    return this;
  }

  public setRatio(ratio: number): ProfilePicture {
    this.ratio = ratio;
    return this;
  }

  static deserialize(json): ProfilePicture {
    return ProfilePicture.create()
      .setUserId(json.userId)
      .setPicture(json.picture)
      .setWidth(json.width)
      .setHeight(json.height)
      .setRatio(json.ratio)
  }
}
