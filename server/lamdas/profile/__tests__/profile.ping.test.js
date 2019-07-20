import request from 'supertest';
import app from '../ping';

describe('Profile routes', () => {
  it('should respond with "Profile Works"', async () => {
    const response = await request(app).get('/api/profile/ping');
    expect(response.statusCode).toBe(200);
  });
});
