import request from 'supertest';
import problems from '../problems';
import { list } from '../../../controllers/problemController';
import app from '../../../server';

jest.mock('../../../controllers/problemController');
jest.mock('mongoose');

list.mock.mockImplementation((req, res) => {
  res.send({});
});

describe('Problems routes', () => {
  beforeEach(() => {});

  it('can create the Problems router', () => {
    expect(problems).toBeDefined();
  });

  it('when request url is /problems then calls list on controller.', async () => {
    await request(app)
      .get('/api/problems/list')
      .expect(200);

    expect(list).toHaveBeenCalled();
  });
});
