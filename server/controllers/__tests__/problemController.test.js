/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import '@babel/polyfill';
import { problems as mockProblems } from './fixtures/problems.json';
import problemController from '../problemController';
import Problem from '../../models/Problem';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
beforeAll(async () => {
  // Arrange
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getConnectionString();
  const opts = {};
  await mongoose.connect(mongoUri, opts, err => {
    if (err) throw new Error(`connection failed: ${err}`);
  });
  await Problem.deleteMany({});
  await Problem.create(mockProblems);
});

afterAll(async () => {
  mongoose.disconnect();
  await mongoServer.stop();
});

describe('Problem api', () => {
  const mockRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/problems/'
  });
  const mockResponse = httpMocks.createResponse();

  it('can get create the Problem controller', async () => {
    expect(problemController.list).toBeDefined();
  });

  it('can list practice problems', async () => {
    // Act
    await problemController.list(mockRequest, mockResponse);
    const actual = mockResponse._getData();
    const expected = mockProblems;

    // Assert
    expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
  });
});
