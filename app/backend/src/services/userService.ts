import { IUser, IUserCredentials, IUserService } from '../interfaces/user';
import User from '../database/models/user';
import JwtService from './jwtService';
import ApiError from '../middlewares/ApiError';
import PasswordService from './passwordService';
import 'dotenv/config';

export default class UserService implements IUserService {
  static async findByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({
      where: { email },
    });
    return user;
  }

  public login = async (credentials: IUserCredentials) => {
    const user: IUser | null = await UserService.findByEmail(credentials.email);

    if (!user) throw new ApiError(401, 'Incorrect email or password');

    if (!PasswordService.checkPassword(credentials.password, user.password)) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    const { id, role } = user;
    const payload = { data: { id, role } };
    const options = {
      expiresIn: '1d',
    };
    const token = await JwtService.generateToken(payload, options);
    return { token };
  };

  public validate = async (token: string): Promise<string> => {
    const role = JwtService.checkToken(token);
    return role;
  };
}
