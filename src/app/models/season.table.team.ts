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

  static getAll(data: any): SeasonTableTeam[] {
    let seasonTableResponses = JSON.parse(JSON.stringify(data))._body;
    let seasonTablesJson = JSON.parse(seasonTableResponses);

    let seasonTables: SeasonTableTeam[] = [];

    for (let i = 0; i < seasonTablesJson.length; i++) {
      let seasonTableJson = seasonTablesJson[i];
      seasonTables.push(SeasonTableTeam.get(seasonTableJson));
    }

    return seasonTables;
  }

  private static get(json: any): SeasonTableTeam {
    let seasonTableTeam = new SeasonTableTeam();
    seasonTableTeam.id = json.id;
    seasonTableTeam.position = json.position;
    seasonTableTeam.icon = json.icon;
    seasonTableTeam.name = json.name;
    seasonTableTeam.games = json.games;
    seasonTableTeam.wonGames = json.wonGames;
    seasonTableTeam.tiedGames = json.tiedGames;
    seasonTableTeam.lostGames = json.lostGames;
    seasonTableTeam.goalRatio = json.goalRatio;
    seasonTableTeam.goalDifference = json.goalDifference;
    seasonTableTeam.points = json.points;

    return seasonTableTeam;
  }
}
