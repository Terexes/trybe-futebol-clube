import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  id: number;
  teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match' });

export default Team;
