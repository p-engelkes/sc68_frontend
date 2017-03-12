import {Team} from "./team";
/**
 * Created by patrickengelkes on 10/03/2017.
 */
export class OldClass {
  public id: number;
  public name: string;
  public orderNumber: number;
  public teams: Team[];

  static create(): OldClass {
    return new OldClass();
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setOrderNumber(orderNumber: number) {
    this.orderNumber = orderNumber;
    return this;
  }

  public setTeams(teams: Team[]) {
    this.teams = teams;
    return this;
  }

  static deserialize(json): OldClass {
    return OldClass.create()
      .setId(json.id)
      .setName(json.name)
      .setOrderNumber(json.orderNumber)
      .setTeams(Team.deserializeTeams(json.teams))
  }

  static getOldClassesFromJson(data: any): OldClass[] {
    let oldClasses: OldClass[] = [];
    let oldClassResponse = JSON.parse(JSON.stringify(data))._body;
    let oldClassesJson = JSON.parse(oldClassResponse);
    for (let i = 0; i < oldClassesJson.length; i++) {
      let oldClassJson = oldClassesJson[i];
      let oldClass = OldClass.deserialize(oldClassJson);
      oldClasses.push(oldClass);
    }

    return oldClasses;
  }
}
