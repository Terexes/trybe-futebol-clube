import { Request, Response } from 'express';
import JoiService from '../services/joiService';
import { IUserService } from '../interfaces/user';

export default class UserController {
  constructor(private _userService: IUserService) {}

  async login(request: Request, response: Response): Promise<void> {
    await JoiService.validateLoginBody(request.body);
    const result = await this._userService.login(request.body);
    response.status(200).json({ token: result?.token });
  }
}
