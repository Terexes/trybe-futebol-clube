import TeamService from '../services/teamService';
import UserController from '../controllers/userController';
import UserService from '../services/userService';
import TeamController from '../controllers/teamController';
import MatchService from '../services/matchService';
import MatchController from '../controllers/matchController';

const userService = new UserService();
const userController = new UserController(userService);
const teamService = new TeamService();
const teamController = new TeamController(teamService);
const matchService = new MatchService();
const matchController = new MatchController(matchService, teamService);
export {
  userService,
  userController,
  teamService,
  teamController,
  matchService,
  matchController,
};
