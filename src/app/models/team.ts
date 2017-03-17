/**
 * Created by pengelkes on 02.12.2016.
 */
export class Team {
  public id: number;
  public name: string;
  public trainingTimes: TrainingTimes[] = [];

  static create(): Team {
    return new Team();
  }

  public setId(id: number): Team {
    this.id = id;
    return this;
  }

  public setName(name: string): Team {
    this.name = name;
    return this;
  }

  public setTrainingTimes(trainingTimes: TrainingTimes[]) {
    this.trainingTimes = trainingTimes;
    return this;
  }

  static deserialize(json) {
    let team = Team.create()
      .setId(json.id)
      .setName(json.name);

    for (let trainingTime in json.trainingTimes) {
      team.trainingTimes.push(new TrainingTimes(trainingTime, json.trainingTimes[trainingTime]));
    }


    return team;
  }

  static getTeamsFromJson(data: any): Team[] {
    let teamResponses = JSON.parse(JSON.stringify(data))._body;
    let teamsJson = JSON.parse(teamResponses);

    return this.deserializeTeams(teamsJson);
  }

  static deserializeTeams(data: any): Team[] {
    let teams: Team[] = [];

    for (let i = 0; i < data.length; i++) {
      let teamJson = data[i];
      let team = Team.deserialize(teamJson);
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
