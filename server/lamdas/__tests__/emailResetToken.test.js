import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import crypto from 'crypto';
import app from '../emailResetToken';
import validateResetInput from '../../validation/reset';
import User from '../../models/User';

jest.mock('../../validation/reset');
const mockToken = '2e54dd4ee3784c21d05d2f570f9e1b948407d4a4';
const mockDateNow = 1563769101244;
const expires = new Date(mockDateNow).getTime() + 3600000;

describe('Reset email token', () => {
  let mongoServer;
  let env;
  const email = 'asdf@asdf.com';

  const validateResetFalse = () => ({
    errors: {},
    isValid: false,
  });
  const validateResetTrue = () => ({
    errors: {},
    isValid: true,
  });

  beforeAll(async () => {
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
    await User.create({ email });
  });

  beforeEach(() => {
    validateResetInput.mockClear();
  });

  afterAll(async () => {
    process.env = env;
    mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should return 400 if validation fails.', async () => {
    validateResetInput.mockImplementation(validateResetFalse);

    const response = await request(app).post('/');
    expect(response.statusCode).toBe(400);
  });

  it('should return 404 if user is not found.', async () => {
    validateResetInput.mockImplementation(validateResetTrue);

    const response = await request(app)
      .post('/')
      .send({ email: 'BADEMAIL@asdf.com' });
    expect(response.statusCode).toBe(404);
  });

  it('should return 200 if user is found.', async () => {
    validateResetInput.mockImplementation(validateResetTrue);

    const response = await request(app)
      .post('/')
      .send({ email });
    expect(response.statusCode).toBe(200);
  });

  it("should update user's token.", async () => {
    // Arrange
    //
    validateResetInput.mockImplementation(validateResetTrue);

    const randomBytes = jest.spyOn(crypto, 'randomBytes');
    randomBytes.mockReturnValueOnce(mockToken);

    const now = jest.spyOn(Date, 'now');
    now.mockReturnValue(mockDateNow);

    // Act
    //
    await request(app)
      .post('/')
      .send({ email });
    const user = await User.findOne({ email }).exec();

    // Expectation/Assert
    expect(user.resetPasswordToken).toEqual(mockToken);
    expect(user.resetPasswordExpires.getTime()).toEqual(expires);

    randomBytes.mockClear();
    now.mockClear();
  });

  xit('should send email to user', () => {
    throw new Error('not implemented');
  });
});
