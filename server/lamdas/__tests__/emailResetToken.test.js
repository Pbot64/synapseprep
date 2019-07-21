import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../emailResetToken';
import validateResetInput from '../../validation/reset';
import User from '../../models/User';

jest.mock('../../validation/reset');

describe('Reset email token', () => {
  let mongoServer;
  let env;
  beforeAll(async () => {
    validateResetInput.mockClear();
    // Arrange
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    env = { ...env };
    process.env.MONGODB_URI = mongoUri;
    const opts = { useNewUrlParser: true };
    await mongoose.connect(mongoUri, opts, (err) => {
      if (err) throw new Error(`connection failed: ${err}`);
    });
    await User.deleteMany({});
    await User.create({ email: 'asdfasdf@asdf.com' });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    process.env = env;
  });

  it('should return 400 if validation fails.', async () => {
    validateResetInput.mockImplementation(() => ({
      errors: {},
      isValid: false,
    }));

    const response = await request(app).post('/');
    expect(response.statusCode).toBe(400);
  });

  it('should return 404 if user is not found.', async () => {
    validateResetInput.mockImplementation(() => ({
      errors: {},
      isValid: true,
    }));

    const response = await request(app)
      .post('/')
      .send({ email: 'asdf@asdf.com' });
    expect(response.statusCode).toBe(404);
  });
});
