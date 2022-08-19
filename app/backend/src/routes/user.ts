import { Router } from 'express';
import { userController } from '.';

const user = Router();

user.post('/', (request, response) => userController.login(request, response));
user.get('/validate', (request, response) => userController.validate(request, response));

export default user;
