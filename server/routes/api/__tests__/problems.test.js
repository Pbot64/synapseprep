import request from 'supertest';
// eslint-disable-next-line no-unused-vars
import express from 'express';
import problemController from '../../../controllers/problemController';
import problems from '../problems';
import '@babel/polyfill';

jest.mock('../../../controllers/problemController');

describe('Problems routes', () => {
  beforeAll(() => {
    problemController.list.mockImplementation((req, res) => {
      return res.send('ok');
    });
  });

  it('can create the Problems router', () => {
    expect(problems).toBeDefined();
  });

  it('when request url is /problems then calls list on controller.', async () => {
    const app = express();
    app.use(problems);
    await request(app)
      .get('/list')
      .expect(200);
    expect(problemController.list).toHaveBeenCalled();
  });
});
