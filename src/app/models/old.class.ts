import {Team} from "./team";
/**
 * Created by patrickengelkes on 10/03/2017.
 */
export class OldClass {
  public id: number;
  public name: string;
  public orderNumber: number;
  public teams: Team[];

  constructor(id?: number, name?: string, orderNumber?: number, teams?: Team[]) {
    this.id = id;
    this.name = name;
    this.orderNumber = orderNumber;
    this.teams = teams;
  }

  static get(json): OldClass {
    let oldClass = new OldClass();
    oldClass.id = json.id;
    oldClass.name = json.name;
    oldClass.orderNumber = json.orderNumber;
    oldClass.teams = Team.getAllFromJson(json.teams);

    return oldClass;
  }

  static getAll(data: any): OldClass[] {
    let oldClasses: OldClass[] = [];
    let oldClassResponse = JSON.parse(JSON.stringify(data))._body;
    let oldClassesJson = JSON.parse(oldClassResponse);
    for (let i = 0; i < oldClassesJson.length; i++) {
      let oldClassJson = oldClassesJson[i];
      let oldClass = OldClass.get(oldClassJson);
      oldClasses.push(oldClass);
    }

    return oldClasses;
  }
}
