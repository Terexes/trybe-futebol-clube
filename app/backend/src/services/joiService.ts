import * as Joi from 'joi';
import ApiError from '../middlewares/ApiError';
import { IUserCredentials } from '../interfaces/user';

export default class JoiService {
  static validateLoginBody = async (credentials: IUserCredentials): Promise<IUserCredentials> => {
    const message = 'All fields must be filled';
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        'string.empty': message,
      }),
      password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(credentials);
    if (error?.message.includes('must be filled')) {
      throw new ApiError(400, error.message);
    }
    if (error?.message.includes('length')) {
      throw new ApiError(401, 'Incorrect email or password');
    }
    return credentials;
  };
}
