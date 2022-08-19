import { IUser, IUserCredentials, IUserService } from '../interfaces/user';
import User from '../database/models/user';
import JwtService from './jwtService';
import ApiError from '../middlewares/ApiError';
import PasswordService from './passwordService';

export default class UserService implements IUserService {
  static async findByEmail(email: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({
      where: { email },
    });
    return user;
  }

  public login = async (credentials: IUserCredentials) => {
    const user: IUser | null = await UserService.findByEmail(credentials.email);
    if (
      !user
      || !PasswordService.checkPassword(credentials.password, user.password)
    ) {
      throw new ApiError(401, 'Incorrect email or password');
    }

    const { id, email, role, username } = user;
    const token = await JwtService.generateToken(user);
    return { user: { id, email, role, username }, token };
  };
}
