/**
 * Created by pengelkes on 02.12.2016.
 */
export class Team {
  public id: number;
  public name: string;
  public trainingTimes: TrainingTimes[] = [];

  constructor(id?: number, name?: string, trainingTimes?: TrainingTimes[]) {
    this.id = id;
    this.name = name;
    if (trainingTimes) {
      this.trainingTimes = trainingTimes
    }
  }

  static get(json) {
    let team = new Team();
    team.id = json.id;
    team.name = json.name;
    console.log(json.trainingTimes);

    for (let trainingTime in json.trainingTimes) {
      team.trainingTimes.push(new TrainingTimes(trainingTime, json.trainingTimes[trainingTime]));
    }

    return team;
  }

  static getAll(data: any): Team[] {
    let teamResponses = JSON.parse(JSON.stringify(data))._body;
    let teamsJson = JSON.parse(teamResponses);

    return this.getAllFromJson(teamsJson);
  }

  static getAllFromJson(data: any): Team[] {
    let teams: Team[] = [];

    for (let i = 0; i < data.length; i++) {
      let teamJson = data[i];
      let team = Team.get(teamJson);
      teams.push(team);
    }

    return teams;
  }
}

export class TrainingTimes {
  public day: string;
  public time: string;

  constructor(day: string, time: string) {
    this.day = day;
    this.time = time;
  }
}
