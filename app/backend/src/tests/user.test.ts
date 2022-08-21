import * as chai from 'chai';
import * as sinon from 'sinon';
import { app } from '../app';
import User from '../database/models/user';
import JwtService from '../services/jwtService';
import PasswordService from '../services/passwordService';
// @ts-ignore
import chaiHttp = require('chai-http');
import {
  loginMock,
  noEmail,
  noPassword,
  testRole,
  tokenMock,
  userMock,
  wrongEmail,
  wrongPassword,
} from './mocks/user';

chai.use(chaiHttp);

describe('/login succesfull request', () => {
  beforeEach(() => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(PasswordService, 'checkPassword').returns(true);
    sinon.stub(JwtService, 'generateToken').resolves(tokenMock.token);
  });
  afterEach(() => {
    sinon.restore();
  }),
    it('Should return a token and 200 status if user credentials are valid', async () => {
      const response = await chai.request(app).post('/login').send(loginMock);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(tokenMock);
    });
});

describe('/login exceptions', () => {
  it('Should return status 400 and a error message if no email is provided', async () => {
    const response = await chai.request(app).post('/login').send(noEmail);
    chai.expect(response.status).to.equal(400);
    chai.expect(response.body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });
  it('Should return status 400 and a error message if no password is provided', async () => {
    const response = await chai.request(app).post('/login').send(noPassword);
    chai.expect(response.status).to.equal(400);
    chai.expect(response.body).to.deep.equal({
      message: 'All fields must be filled',
    });
  });
  it('Should return status 401 and a error message if a wrong email is provided', async () => {
    const response = await chai.request(app).post('/login').send(wrongEmail);
    chai.expect(response.status).to.equal(401);
    chai.expect(response.body).to.deep.equal({
      message: 'Incorrect email or password',
    });
  });
  it('Should return status 401 and a error message if a wrong password is provided', async () => {
    const response = await chai.request(app).post('/login').send(wrongPassword);
    chai.expect(response.status).to.equal(401);
    chai.expect(response.body).to.deep.equal({
      message: 'Incorrect email or password',
    });
  });
});

describe('/login/validate', () => {
  beforeEach(() => {
    sinon.restore();
  }),
    it('Should return status 200 and user role based on the token informed', async () => {
      sinon.stub(JwtService, 'checkToken').resolves('admin');
      const response = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', tokenMock.token);
      chai.expect(response.status).to.equal(200);
      chai.expect(response.body).to.deep.equal(testRole);
    });
});
