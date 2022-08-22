import ApiError from '../middlewares/ApiError';
import { ITeamService } from '../interfaces/teams';
import Team from '../database/models/team';

export default class TeamService implements ITeamService {
  public getAll = async (): Promise<Team[]> => {
    const teams: Team[] = await Team.findAll();
    return teams;
  };

  public getById = async (id: number): Promise<Team> => {
    const team: Team | null = await Team.findByPk(id);

    if (!team) throw new ApiError(404, 'There is no team with such id!');
    return team;
  };
}
