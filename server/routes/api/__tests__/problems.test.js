import express from 'express';
// eslint-disable-next-line import/no-named-default
import { default as request } from 'supertest';
import problems from '../problems';
import 'babel-polyfill';

const controllerMock = jest.mock('../../../controllers/problemController');

describe('Problems routes', () => {
  beforeEach(() => {});

  it('can create the Problems router', () => {
    expect(problems).toBeDefined();
  });

  it('when request url is /problems then calls list on controller.', () => {
    const app = express();
    app.use('/api/problems', problems);
    const response = request(app).get('/api/problems/list');
    expect(controllerMock).toHaveBeenCalled();
    expect(response).toBeDefined();
  });
});
