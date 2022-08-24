import Match from '../database/models/match';
import Team from '../database/models/team';
import { IMatchService, IBodyMatch } from '../interfaces/match';

export default class MatchService implements IMatchService {
  public getAll = async (): Promise<Match[]> => {
    const matches: Match[] = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  public getAllInProgress = async (inProgress: string): Promise<Match[]> => {
    const matches: Match[] = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { inProgress },
    });
    return matches;
  };

  public saveMatch = async (match: IBodyMatch): Promise<Match> => {
    const result = await Match.create({
      ...match,
      inProgress: true,
    });
    return result;
  };

  public endMatch = async (id: number) => {
    await Match.update(
      {
        inProgress: false,
      },
      { where: { id } },
    );
  };

  public updateMatch = async (id:number, match:IBodyMatch): Promise<Match[]> => {
    await Match.update(match, { where: { id } });
    const result = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
      where: { id },
    });
    return result;
  };
}
