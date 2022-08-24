import { Request, Response } from 'express';
import ApiError from '../middlewares/ApiError';
import { ITeamService } from '../interfaces/teams';
import Match from '../database/models/match';
import { IMatchService } from '../interfaces/match';
import JwtService from '../services/jwtService';

export default class MatchController {
  constructor(
    private _MatchService: IMatchService,
    private _TeamService: ITeamService,
  ) {}

  public async getAll(request: Request, response: Response): Promise<void> {
    const { inProgress } = request.query;
    let result: Match[] = [];

    if (typeof inProgress === 'string') {
      result = await this._MatchService.getAllInProgress(
        JSON.parse(inProgress),
      );
    } else {
      result = await this._MatchService.getAll();
    }
    response.status(200).json(result);
  }

  public async getAllInProgress(
    inProgress: string,
    response: Response,
  ): Promise<void> {
    const result = await this._MatchService.getAllInProgress(inProgress);
    response.status(200).json(result);
  }

  public async saveMatch(request: Request, response: Response): Promise<void> {
    const { homeTeam, awayTeam } = request.body;
    const token = request.headers.authorization || '';
    if (homeTeam === awayTeam) {
      throw new ApiError(
        401,
        'It is not possible to create a match with two equal teams',
      );
    }
    await JwtService.checkToken(token);
    await Promise.all([this._TeamService.getById(homeTeam), this._TeamService.getById(awayTeam)]);
    const result = await this._MatchService.saveMatch(request.body);
    response.status(201).json(result);
  }

  public async endMatch(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    await this._MatchService.endMatch(Number(id));
    response.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const result = await this._MatchService.updateMatch(Number(id), request.body);
    response.status(200).json(result);
  }
}
