export class SeasonGame {
  public id: number;
  public gameTime: string;
  public homeTeamName: string;
  public awayTeamName: string;
  public score: Score;
  public gameType: string;

  static getSeasonGamesFromJson(data: any): SeasonGame[] {
    let seasonGameResponses = JSON.parse(JSON.stringify(data))._body;
    let seasonGamesJson = JSON.parse(seasonGameResponses);

    return this.deserializeSeasonGames(seasonGamesJson);
  }

  private static deserializeSeasonGames(data: any) {
    let seasonGames: SeasonGame[] = [];

    for (let i = 0; i < data.length; i++) {
      let seasonGameJson = data[i];
      seasonGames.push(SeasonGame.deserialize(seasonGameJson));
    }

    return seasonGames
  }

  private static deserialize(json: any) {
    let seasonGame = new SeasonGame();
    seasonGame.id = json.id;
    seasonGame.gameTime = json.gameTime;
    seasonGame.homeTeamName = json.homeTeamName;
    seasonGame.awayTeamName = json.awayTeamName;
    seasonGame.score = Score.deserialize(json.score);
    seasonGame.gameType = json.gameType;

    return seasonGame;
  }
}

export class Score {
  public homeTeamGoals;
  public awayTeamGoals;

  static deserialize(json) {
    let score = new Score();
    score.homeTeamGoals = json.homeTeamGoals;
    score.awayTeamGoals = json.awayTeamGoals;

    return score;
  }
}
