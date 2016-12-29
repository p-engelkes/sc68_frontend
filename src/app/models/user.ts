import {Team} from "./team";
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
  public created: Date;

  getFullName(): string {
    return this.firstName + " " + this.lastName;
  }

  deserialize(json): User {
    console.log(json);
    this.id = json.id;
    this.firstName = json.firstName;
    this.lastName = json.lastName;
    this.userName = json.userName;
    this.password = json.password;
    this.email = json.email;
    this.created = json.created;
    this.position = json.position;
    this.backNumber = json.backNumber;
    if (json.teamId > 0) {
      this.team = new Team().deserialize(json.team);
    }

    return this;
  }

  registerUser(email: string, password: string): User {
    this.email = email;
    this.password = password;

    return this;
  }

  create(firstName: string, lastName: string, email: string, userName: string, password: string): User {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userName = userName;
    this.password = password;

    return this;
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
