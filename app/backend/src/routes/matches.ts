import { Router } from 'express';
import { matchController } from '.';

const matches = Router();

matches.patch('/:id/finish', (request, response) => matchController.endMatch(request, response));
matches.patch('/:id', (request, response) => matchController.updateMatch(request, response));
matches.get('/', (request, response) => matchController.getAll(request, response));
matches.post('/', (request, response) => matchController.saveMatch(request, response));

export default matches;
