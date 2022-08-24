export interface IMatchesResponse {
  totalDraws: number;
  totalVictories: number;
  totalLosses: number;
  totalGames: number;
}

export interface IGoalsResponse {
  goalsFavor: number;
  goalsOwn: number
}

export interface ITeamScore {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}
