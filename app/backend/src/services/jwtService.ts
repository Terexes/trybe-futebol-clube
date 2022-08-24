import { sign, verify, Secret, JwtPayload, SignOptions } from 'jsonwebtoken';
import ApiError from '../middlewares/ApiError';
import { ICustomJwtPayload } from '../interfaces/user';

const secret: Secret = process.env.JWT_SECRET || 'mySecret';

export default class JwtService {
  static async generateToken(payload: JwtPayload, options: SignOptions): Promise<string> {
    const token: string = sign(payload, secret, options);
    return token;
  }

  static checkToken = async (token: string): Promise<string> => {
    try {
      const { data: { role } } = verify(token, secret) as ICustomJwtPayload;
      if (!role) throw new ApiError(401, 'Token must be a valid token');
      return role;
    } catch (error) {
      throw new ApiError(401, 'Token must be a valid token');
    }
  };
}
