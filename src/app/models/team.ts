/**
 * Created by pengelkes on 02.12.2016.
 */
export class Team {
  public id: number;
  public name: string;
  public trainingTimes: Training[] = [];

  create(name: string, trainingTimes: Training[]) {
    this.name = name;
    this.trainingTimes = trainingTimes;

    return this;
  }

  deserialize(json) {
    this.id = json.id;
    this.name = json.name;
    for (let trainingTime in json.trainingTimes) {
      this.trainingTimes.push(new Training(trainingTime, json.trainingTimes[trainingTime]));
    }

    return this;
  }

  static getTeamsFromJson(data: any): Team[] {
    let teams: Team[] = [];
    let teamResponses = JSON.parse(JSON.stringify(data))._body;
    let teamsJson = JSON.parse(teamResponses);
    for (let i = 0; i < teamsJson.length; i++) {
      let teamJson = teamsJson[i];
      let team = new Team().deserialize(teamJson);
      teams.push(team);
    }

    return teams;
  }
}

export class Training {
  public day: string;
  public time: string;

  constructor(day: string, time: string) {
    this.day = day;
    this.time = time;
  }
}
