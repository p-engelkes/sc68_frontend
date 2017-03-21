export class SeasonTableTeam {
  public id: number;
  public position: number;
  public icon: string;
  public name: string;
  public games: number;
  public wonGames: number;
  public tiedGames: number;
  public lostGames: number;
  public goalRatio: string;
  public goalDifference: number;
  public points: number;

  static create() {
    return new SeasonTableTeam();
  }

  public setId(id: number) {
    this.id = id;
    return this;
  }

  public setPosition(position: number) {
    this.position = position;
    return this;
  }

  public setIcon(icon: string) {
    this.icon = icon;
    return this;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public setGames(games: number) {
    this.games = games;
    return this;
  }

  public setWonGames(wonGames: number) {
    this.wonGames = wonGames;
    return this;
  }

  public setTiedGames(tiedGames: number) {
    this.tiedGames = tiedGames;
    return this;
  }

  public setLostGames(lostGames: number) {
    this.lostGames = lostGames;
    return this;
  }

  public setGoalRatio(goalRatio: string) {
    this.goalRatio = goalRatio;
    return this;
  }

  public setGoalDifference(goalDifference: number) {
    this.goalDifference = goalDifference;
    return this;
  }

  public setPoints(points: number) {
    this.points = points;
    return this;
  }

  static getSeasonTableTeamsFromJson(data: any): SeasonTableTeam[] {
    let seasonTableResponses = JSON.parse(JSON.stringify(data))._body;
    let seasonTablesJson = JSON.parse(seasonTableResponses);

    return this.deserializeSeasonTables(seasonTablesJson.tableTeams);
  }

  private static deserializeSeasonTables(data: any): SeasonTableTeam[] {
    let seasonTables: SeasonTableTeam[] = [];

    for (let i = 0; i < data.length; i++) {
      let seasonTableJson = data[i];
      seasonTables.push(SeasonTableTeam.deserialize(seasonTableJson));
    }

    return seasonTables;
  }

  private static deserialize(json: any): SeasonTableTeam {
    return SeasonTableTeam.create()
      .setId(json.id)
      .setPosition(json.position)
      .setIcon(json.icon)
      .setName(json.name)
      .setGames(json.games)
      .setWonGames(json.wonGames)
      .setTiedGames(json.tiedGames)
      .setLostGames(json.lostGames)
      .setGoalRatio(json.goalRatio)
      .setGoalDifference(json.goalDifference)
      .setPoints(json.points);
  }
}
