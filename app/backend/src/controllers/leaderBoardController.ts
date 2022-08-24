import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private _LeaderboardService: LeaderboardService) {}

  public async getHomeLeaderboard(_request: Request, response: Response): Promise<void> {
    const result = await this._LeaderboardService.getLeaderboard('home');
    response.status(200).json(result);
  }

  public async getAwayLeaderboard(_request: Request, response: Response): Promise<void> {
    const result = await this._LeaderboardService.getLeaderboard('away');
    response.status(200).json(result);
  }

  public async getGeneralLeaderboard(_request: Request, response: Response): Promise<void> {
    const result = await this._LeaderboardService.getLeaderboard('general');
    response.status(200).json(result);
  }
}
