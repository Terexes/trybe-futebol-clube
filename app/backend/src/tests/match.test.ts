import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import Match from '../database/models/match';
// @ts-ignore
import chaiHttp = require('chai-http');
import {
  allMatches,
  IMatchesMock,
  matchesInProgressFalse,
  matchesInProgressTrue,
  saveMatch,
  saveMatchBody,
  updatedMatch,
  updatedMatchResult,
  updateMatchBody,
} from './mocks/matches';
import { tokenMock } from './mocks/user';
import PasswordService from '../services/passwordService';
import JwtService from '../services/jwtService';

chai.use(chaiHttp);

describe('/matches succesfull requests', () => {
  describe('', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(allMatches as IMatchesMock[]);
    });
    afterEach(() => {
      sinon.restore();
    }),
      it('Should return all matches and 200 status if succesfull', async () => {
        const response = await chai.request(app).get('/matches');
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.deep.equal(allMatches);
      });
  });

  describe('', () => {
    beforeEach(() => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesInProgressTrue as IMatchesMock[]);
    });
    afterEach(() => {
      sinon.restore();
    }),
      it('Should return all in progress matches and 200 status if succesfull', async () => {
        const response = await chai
          .request(app)
          .get('/matches?inProgress=true');
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.deep.equal(matchesInProgressTrue);
      });
  });

  describe('', () => {
    beforeEach(() => {
      sinon
        .stub(Match, 'findAll')
        .resolves(matchesInProgressFalse as IMatchesMock[]);
    });
    afterEach(() => {
      sinon.restore();
    }),
      it('Should return all finished matches and 200 status if succesfull', async () => {
        const response = await chai
          .request(app)
          .get('/matches?inProgress=false');
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.deep.equal(matchesInProgressFalse);
      });
  });

  describe('', () => {
    beforeEach(() => {
      sinon.stub(Match, 'create').resolves(saveMatch as Match);
      sinon.stub(JwtService, 'checkToken').resolves('admin');
    });
    afterEach(() => {
      sinon.restore();
    }),
      it('Should return 201 status and saved match details', async () => {
        const response = await chai
          .request(app)
          .post('/matches')
          .set('authorization', tokenMock.token)
          .send(saveMatchBody);
        chai.expect(response.status).to.equal(201);
        chai.expect(response.body).to.deep.equal(saveMatch);
      });
  });

  describe('', () => {
    beforeEach(() => {
      sinon.stub(Match, 'update').resolves();
    });
    afterEach(() => {
      sinon.restore();
    }),
      it('Should return 201 status and a message', async () => {
        const response = await chai.request(app).patch('/matches/50/finish');
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.deep.equal({
          message: 'Finished',
        });
      });
  });

  describe('', () => {
    beforeEach(() => {
      sinon.stub(Match, 'findAll').resolves(updatedMatch as IMatchesMock[]);
    });
    afterEach(() => {
      sinon.restore();
    }),
      it('Should return 200 status and updated match infos', async () => {
        const response = await chai
          .request(app)
          .patch('/matches/48')
          .send(updateMatchBody);
        chai.expect(response.status).to.equal(200);
        chai.expect(response.body).to.deep.equal(updatedMatch);
      });
  });
});
