import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import Team from '../database/models/team';
// @ts-ignore
import chaiHttp = require('chai-http');
import { allTeams, succesfullTeamById } from './mocks/teams';

chai.use(chaiHttp);

describe('/teams succesfull requests', () => {
  beforeEach(() => {
    sinon.stub(Team, 'findAll').resolves(allTeams as Team[]);
    sinon.stub(Team, 'findByPk').resolves(succesfullTeamById as Team);
  });
  afterEach(() => {
    sinon.restore();
  }),
    it('Should return all teams and 200 status if succesfull', async () => {
      const response = await chai.request(app).get('/teams');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(allTeams);
    });
  it('Should return a specific team and 200 status if succesfull', async () => {
    const response = await chai.request(app).get('/teams/1');
    chai.expect(response.status).to.equal(200);
    chai.expect(response.body).to.deep.equal(succesfullTeamById);
  });
});
describe('/teams exceptions', () => {
  it('Should return status 404 and a message if an wrong id was sent', async () => {
    const response = await chai.request(app).get('/teams/90');
    chai.expect(response.status).to.equal(404);
    chai.expect(response.body).to.deep.equal({
      message: 'There is no team with such id!',
    });
  });
});
