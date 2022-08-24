import Match from '../../database/models/match';

export interface IMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string;
  };
  teamAway?: {
    teamName: string;
  };
}

export interface IBodyMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
}

export interface IBodyUpdate {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchService {
  getAll(): Promise<Match[]>;
  getAllInProgress(inProgress: string): Promise<Match[]>;
  saveMatch(match: IBodyMatch): Promise<Match>;
  endMatch(id: number): Promise<void>;
  updateMatch(id: number, match: IBodyUpdate): Promise<Match[]>;
}
