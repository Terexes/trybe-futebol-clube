import Team from '../../database/models/team';

export interface ITeam {
  id: number,
  teamName: string
}

export interface ITeamService {
  getAll(): Promise<Team[]>,
  getById(id: number): Promise<Team>
}
