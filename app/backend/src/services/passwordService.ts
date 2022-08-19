import * as bcrypt from 'bcryptjs';

export default class PasswordService {
  static checkPassword = (password: string, hash: string): boolean =>
    bcrypt.compareSync(password, hash);
}
