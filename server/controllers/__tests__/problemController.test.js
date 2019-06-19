/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import { problems as mockProblems } from './fixtures/problems.json';
import problemController from '../problemController';
import Problem from '../../models/Problem';

describe('Problem api', () => {
  const mockRequest = httpMocks.createRequest({
    method: 'GET',
    url: '/problems/'
  });
  const mockResponse = httpMocks.createResponse();

  it('can get create the Problem controller', () => {
    expect(problemController.list).toBeDefined();
  });

  it('can list practice problems', () => {
    // Arrange
    jest.mock('../../models/Problem', () => ({
      find: Promise.resolve(mockProblems)
    }));

    // Act
    problemController.list(mockRequest, mockResponse);
    const actual = mockResponse._getData();
    const expected = mockProblems;

    // Assert
    expect(actual).toEqual(expected);
  });

  it('calls Mongo database to retrieve practice problewms', () => {
    problemController.list(mockRequest, mockResponse);
  });
});
