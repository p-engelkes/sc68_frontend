import {Team} from "./team";
import {DataService} from "../services/data.service";
/**
 * Created by pengelkes on 30.11.2016.
 */
export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public userName: string;
  public password: string;
  public email: string;
  public team: Team;
  public teamId: number;
  public backNumber: number;
  public position: string;
  public profilePicture: string;
  public created: Date;

  static create(): User {
    return new User();
  }

  public setId(id: number): User {
    this.id = id;
    return this;
  }

  public setFirstName(firstName: string): User {
    this.firstName = firstName;
    return this;
  }

  public setLastName(lastName: string): User {
    this.lastName = lastName;
    return this;
  }

  public setUserName(userName: string): User {
    this.userName = userName;
    return this;
  }

  public setPassword(password: string): User {
    this.password = password;
    return this;
  }

  public setEmail(email: string): User {
    this.email = email;
    return this;
  }

  public setTeam(team: Team): User {
    this.team = team;
    return this;
  }

  public setTeamId(teamId: number): User {
    this.teamId = teamId;
    return this;
  }

  public setBackNumber(backNumber: number): User {
    this.backNumber = backNumber;
    return this;
  }

  public setPosition(position: string): User {
    this.position = position;
    return this;
  }

  public setCreated(created: Date): User {
    this.created = created;
    return this;
  }

  public setProfilePicture(profilePicture: string): User {
    this.profilePicture = profilePicture;
    return this;
  }

  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }

  static deserialize(json): User {
    let user = User.create()
      .setId(json.id)
      .setFirstName(json.firstName)
      .setLastName(json.lastName)
      .setPassword(json.password)
      .setEmail(json.email)
      .setCreated(json.created)
      .setPosition(json.position)
      .setBackNumber(json.backNumber)
      .setProfilePicture(json.profilePicture);
    if (json.teamId > 0) {
      user.setTeam(new Team().deserialize(json.team));
      user.setTeamId(json.teamId);
    }

    return user;
  }

  static getUserFromJsonResponse(data: any, dataService: DataService): User {
    let userResponse = JSON.parse(JSON.stringify(data))._body;
    let userJson = JSON.parse(userResponse);
    let user = User.deserialize(userJson);
    dataService.user = user;
    return user;
  }

  static registerUser(email: string, password: string): User {
    return User.create()
      .setEmail(email)
      .setPassword(password);
  }
}

export class Position {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  static getPositionsFromJson(json): Position[] {
    let positionsBody = JSON.parse(JSON.stringify(json))._body;
    let positionsJson = JSON.parse(positionsBody);
    let positions = [];
    for (let i = 0; i < positionsJson.length; i++) {
      let positionJson = positionsJson[i];
      positions.push(new Position(positionJson));
    }

    return positions;
  }
}
