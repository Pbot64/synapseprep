import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import mockedEnv from 'mocked-env';
import Email from 'email-templates';
import path from 'path';
import app from '../emailResetToken';
import validateResetInput from '../../validation/reset';
import User from '../../models/User';

jest.mock('../../validation/reset');
jest.mock('nodemailer', () => ({ createTransport: jest.fn() }));
jest.mock('email-templates');

const mockToken = '2e54dd4ee3784c21d05d2f570f9e1b948407d4a4';
const mockDateNow = 1563769101244;
const expires = new Date(mockDateNow).getTime() + 3600000;
const emailPassword = 'ASDFASDF';

describe('Reset email token', () => {
  let mongoServer;
  let restore;
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
    const opts = { useNewUrlParser: true };
    await mongoose.connect(mongoUri, opts, (err) => {
      if (err) throw new Error(`connection failed: ${err}`);
    });
    await User.deleteMany({});
    await User.create({ email });

    restore = mockedEnv({
      EMAIL_PASSWORD: emailPassword,
      MONGODB_URI: mongoUri,
    });
  });

  beforeEach(() => {
    nodemailer.createTransport.mockClear();
    validateResetInput.mockReset();
    Email.mockClear();
  });

  afterEach(() => {});

  afterAll(async () => {
    mongoose.disconnect();
    await mongoServer.stop();
    restore();
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

    randomBytes.mockRestore();
    now.mockRestore();
  });

  it('should send email to user', async () => {
    // Arrange
    //
    validateResetInput.mockImplementation(validateResetTrue);

    const randomBytes = jest.spyOn(crypto, 'randomBytes');
    randomBytes.mockReturnValueOnce(mockToken);

    const now = jest.spyOn(Date, 'now');
    now.mockReturnValue(mockDateNow);

    const join = jest.spyOn(path, 'join');
    join.mockReturnValueOnce('/tests/');

    await request(app)
      .post('/')
      .send({ email });

    expect(nodemailer.createTransport.mock.calls[0][0]).toEqual({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'synapseprep@gmail.com',
        pass: emailPassword,
      },
    });

    const emailOptions = {
      template: '/tests/',
      message: {
        to: email,
      },
      locals: {
        title: 'Password Reset Request',
        message:
          'We just got a request to reset your password.\n\n'
          + 'Please click the button below, or paste this url into your browser to complete the process:\n\n'
          + `https://app.synapseprep.net/resetpassword/${mockToken}`,
        buttonText: 'Reset Password',
        buttonLink: `https://app.synapseprep.net/resetpassword/${mockToken}`,
        subject: 'Synapse Prep Password Reset Request',
      },
    };
    expect(Email.mock.instances[0].send.mock.calls[0][0]).toEqual(emailOptions);

    randomBytes.mockRestore();
    join.mockRestore();
  });
});
