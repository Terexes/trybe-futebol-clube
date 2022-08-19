import { Request, Response } from 'express';
import JoiService from '../services/joiService';
import { IUserService } from '../interfaces/user';

export default class UserController {
  constructor(private _userService: IUserService) {}

  async login(request: Request, response: Response): Promise<void> {
    await JoiService.validateLoginBody(request.body);
    const result = await this._userService.login(request.body);
    response.status(200).json(result);
  }

  public validate = async (request: Request, response: Response): Promise<void> => {
    const token = request.headers.authorization || '';
    const role = await this._userService.validate(token);
    response.status(200).json({ role });
  };
}
