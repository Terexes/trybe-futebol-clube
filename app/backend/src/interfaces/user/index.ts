import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserService {
  login(credentials: IUserCredentials): Promise<ILoginResponse | null>;
  validate(token: string): Promise<string>;
}

export interface ICustomJwtPayload extends JwtPayload {
  data: {
    role: string;
  }
}
