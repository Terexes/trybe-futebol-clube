import { Router } from 'express';
import { leaderboardController } from '.';

const leaderboard = Router();

leaderboard.get('/home', (request, response) =>
  leaderboardController.getHomeLeaderboard(request, response));

leaderboard.get('/away', (request, response) =>
  leaderboardController.getAwayLeaderboard(request, response));

export default leaderboard;
