import TeamService from '../services/teamService';
import UserController from '../controllers/userController';
import UserService from '../services/userService';
import TeamController from '../controllers/teamController';

const userService = new UserService();
const userController = new UserController(userService);
const teamService = new TeamService();
const teamController = new TeamController(teamService);

export {
  userService,
  userController,
  teamService,
  teamController,
};
