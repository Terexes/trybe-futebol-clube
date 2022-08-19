export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: {
    id: number;
    email: string;
    role: string;
    username: string;
  };
  token: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IUserService {
  login(credentials: IUserCredentials): Promise<ILoginResponse | null>;
}
