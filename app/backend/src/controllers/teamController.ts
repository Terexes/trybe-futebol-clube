import { Request, Response } from 'express';
import { ITeamService } from '../interfaces/teams';

export default class TeamController {
  constructor(private _TeamService: ITeamService) {}
  async getAll(_request: Request, response: Response): Promise<void> {
    const result = await this._TeamService.getAll();
    response.status(200).json(result);
  }

  async getById(request: Request, response: Response): Promise <void> {
    const { id } = request.params;
    const result = await this._TeamService.getById(Number(id));
    response.status(200).json(result);
  }
}
