import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import Match from '../database/models/match';
import {
  allMatches,
  homeLeaderboard,
  awayLeaderboard,
  generalLeaderboard
} from './mocks/leaderboard';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('General Ranking', () => {
    it('should return 200 status and overall team ranking', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(allMatches as unknown as Match[]);
      const response = await chai.request(app).get('/leaderboard');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(generalLeaderboard);
    });
  });

  describe('Home Ranking', () => {
    it('should return status 200 and ranking of home teams', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(allMatches as unknown as Match[]);
      const response = await chai.request(app).get('/leaderboard/home');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(homeLeaderboard);
    });
  });

  describe('Away Ranking', () => {
    it('should return status 200 and ranking of away teams', async () => {
      sinon
        .stub(Match, 'findAll')
        .resolves(allMatches as unknown as Match[]);
      const response = await chai.request(app).get('/leaderboard/away');
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(awayLeaderboard);
    });
  });
});
