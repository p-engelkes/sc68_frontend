/**
 * Created by pengelkes on 30.11.2016.
 */
export class User {
  public userId: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;
  public email: string;
  public created: Date;

  registerUser(email: string, password: string) {
    this.email = email;
    this.password = password;

    return this;
  }

  create(firstName: string, lastName: string, email: string, userName: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;

    return this;
  }
}
