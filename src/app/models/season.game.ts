export class SeasonGame {
  public id: number;
  public gameTime: string;
  public homeTeamName: string;
  public awayTeamName: string;
  public score: Score;
  public gameType: string;

  static getAll(data: any): SeasonGame[] {
    let seasonGameResponses = JSON.parse(JSON.stringify(data))._body;
    let seasonGamesJson = JSON.parse(seasonGameResponses);

    let seasonGames: SeasonGame[] = [];

    for (let i = 0; i < seasonGamesJson.length; i++) {
      let seasonGameJson = seasonGamesJson[i];
      seasonGames.push(SeasonGame.get(seasonGameJson));
    }

    return seasonGames
  }

  private static get(json: any) {
    let seasonGame = new SeasonGame();
    seasonGame.id = json.id;
    seasonGame.gameTime = json.gameTime;
    seasonGame.homeTeamName = json.homeTeamName;
    seasonGame.awayTeamName = json.awayTeamName;
    seasonGame.score = Score.get(json.score);
    seasonGame.gameType = json.gameType;

    return seasonGame;
  }
}

export class Score {
  public homeTeamGoals;
  public awayTeamGoals;

  static get(json) {
    let score = new Score();
    score.homeTeamGoals = json.homeTeamGoals;
    score.awayTeamGoals = json.awayTeamGoals;

    return score;
  }
}
