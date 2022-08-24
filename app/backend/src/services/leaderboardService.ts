import { ITeamService, ITeam } from '../interfaces/teams';
import { IMatchService } from '../interfaces/match';
import {
  IGeneralResponse,
  IGoalsResponse,
  IMatchesResponse,
  ITeamScore,
} from '../interfaces/leaderboard';

const leaderboardSort = (prev: ITeamScore, curr: ITeamScore) => {
  // ordenação decrescente
  let result = curr.totalPoints - prev.totalPoints; // primeiro critério de ordenação
  if (!result) result = curr.totalVictories - prev.totalVictories; // desempate 1
  if (!result) result = curr.goalsBalance - prev.goalsBalance; // desempate 2
  if (!result) result = curr.goalsFavor - prev.goalsFavor; // desempate 3
  if (!result) result = curr.goalsOwn - prev.goalsOwn; // desempate 4
  return result;
};

export default class LeaderboardService {
  constructor(
    private _MatchService: IMatchService,
    private _TeamService: ITeamService,
  ) {}

  public getHomeTeamMatches = async (
    teamId: number,
  ): Promise<IMatchesResponse> => {
    const allMatches = await this._MatchService.getAllInProgress('false');
    const home = allMatches.filter(({ homeTeam }) => homeTeam === teamId);
    const totalDraws = home.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
    const totalVictories = home.filter(
      (match) => match.homeTeamGoals > match.awayTeamGoals,
    ).length;
    const totalLosses = home.filter(
      (match) => match.homeTeamGoals < match.awayTeamGoals,
    ).length;
    const totalGames = home.length;
    return { totalDraws, totalVictories, totalLosses, totalGames };
  };

  public getAwayTeamMatches = async (
    teamId: number,
  ): Promise<IMatchesResponse> => {
    const allMatches = await this._MatchService.getAllInProgress('false');
    const away = allMatches.filter(({ awayTeam }) => awayTeam === teamId);
    const totalDraws = away.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
    const totalVictories = away.filter(
      (match) => match.homeTeamGoals < match.awayTeamGoals,
    ).length;
    const totalLosses = away.filter(
      (match) => match.homeTeamGoals > match.awayTeamGoals,
    ).length;
    const totalGames = away.length;
    return { totalDraws, totalVictories, totalLosses, totalGames };
  };

  public getGeneralMatches = async (teamId: number): Promise<IGeneralResponse> => {
    const {
      totalDraws: homeDraws,
      totalLosses: homeLosses,
      totalVictories: homeVictories,
      totalGames: homeMatches,
    } = await this.getHomeTeamMatches(teamId);
    const {
      totalDraws: awayDraws,
      totalLosses: awayLosses,
      totalVictories: awayVictories,
      totalGames: awayMatches,
    } = await this.getAwayTeamMatches(teamId);
    return {
      totalDraws: homeDraws + awayDraws,
      totalLosses: homeLosses + awayLosses,
      totalVictories: homeVictories + awayVictories,
      totalGames: homeMatches + awayMatches,
    };
  };

  public getHomeGoals = async (teamId: number): Promise<IGoalsResponse> => {
    const allMatches = await this._MatchService.getAllInProgress('false');

    const goalsFavor = allMatches.reduce((acc, currMatch) => {
      if (currMatch.homeTeam === teamId) return acc + currMatch.homeTeamGoals;
      return acc;
    }, 0);

    const goalsOwn = allMatches.reduce((acc, currMatch) => {
      if (currMatch.homeTeam === teamId) return acc + currMatch.awayTeamGoals;
      return acc;
    }, 0);

    return { goalsFavor, goalsOwn };
  };

  public getAwayGoals = async (teamId: number): Promise<IGoalsResponse> => {
    const allMatches = await this._MatchService.getAllInProgress('false');

    const goalsFavor = allMatches.reduce((acc, currMatch) => {
      if (currMatch.awayTeam === teamId) return acc + currMatch.awayTeamGoals;
      return acc;
    }, 0);

    const goalsOwn = allMatches.reduce((acc, currMatch) => {
      if (currMatch.awayTeam === teamId) return acc + currMatch.homeTeamGoals;
      return acc;
    }, 0);

    return { goalsFavor, goalsOwn };
  };

  public getGeneralGoals = async (teamId: number): Promise <IGoalsResponse> => {
    const { goalsFavor: goalsFavorHome, goalsOwn: goalsOwnHome } = await this.getHomeGoals(teamId);
    const { goalsFavor: goalsFavorAway, goalsOwn: goalsOwnAway } = await this.getAwayGoals(teamId);
    return {
      goalsFavor: goalsFavorHome + goalsFavorAway,
      goalsOwn: goalsOwnHome + goalsOwnAway,
    };
  };

  public generateHomeScore = async (team: ITeam): Promise<ITeamScore> => {
    const matches: IMatchesResponse = await this.getHomeTeamMatches(team.id);
    const { totalDraws, totalVictories, totalLosses, totalGames } = matches;
    const { goalsFavor, goalsOwn } = await this.getHomeGoals(team.id);
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const score: ITeamScore = {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
    return score;
  };

  public generateAwayScore = async (team: ITeam): Promise<ITeamScore> => {
    const matches: IMatchesResponse = await this.getAwayTeamMatches(team.id);
    const { totalDraws, totalVictories, totalLosses, totalGames } = matches;
    const { goalsFavor, goalsOwn } = await this.getAwayGoals(team.id);
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const score: ITeamScore = {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
    return score;
  };

  public generateGeneralScore = async (team:ITeam): Promise<ITeamScore> => {
    const matches = await this.getGeneralMatches(team.id);
    const { totalDraws, totalVictories, totalLosses, totalGames } = matches;
    const { goalsFavor, goalsOwn } = await this.getGeneralGoals(team.id);
    const totalPoints = totalVictories * 3 + totalDraws * 1;
    const score: ITeamScore = {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
    return score;
  };

  public getLeaderboard = async (filter: 'home' | 'away' | 'general') => {
    const allTeams = await this._TeamService.getAll();
    const allScores: Promise<ITeamScore>[] = [];
    for (let i = 0; i < allTeams.length; i += 1) {
      if (filter === 'home') {
        const score: Promise<ITeamScore> = this.generateHomeScore(allTeams[i]);
        allScores.push(score);
      }
      if (filter === 'away') {
        const score: Promise<ITeamScore> = this.generateAwayScore(allTeams[i]);
        allScores.push(score);
      }
      if (filter === 'general') {
        const score: Promise<ITeamScore> = this.generateGeneralScore(allTeams[i]);
        allScores.push(score);
      }
    }
    const result = await Promise.all(allScores);
    return result.sort(leaderboardSort);
  };
}
