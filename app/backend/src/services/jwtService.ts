import { sign } from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

const secret = process.env.JWT_SECRET || 'mySecret';

export default class JwtService {
  static async generateToken(credentials: IUser): Promise<string> {
    const { password, ...data } = credentials;
    const token: string = sign({ data }, secret, { expiresIn: '1d' });
    return token;
  }
}
