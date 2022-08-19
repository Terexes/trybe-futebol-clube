import { Router } from 'express';
import { userController } from '.';

const user = Router();

user.post('/', (request, response) => userController.login(request, response));

export default user;
