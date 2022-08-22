import { Router } from 'express';
import { teamController } from '.';

const teams = Router();

teams.get('/', (request, response) => teamController.getAll(request, response));
teams.get('/:id', (request, response) => teamController.getById(request, response));

export default teams;
