/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import problemController from '../problemController';

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
    problemController.list(mockRequest, mockResponse);
    const actual = mockResponse._getData();
    const expected = { data: [{ id: 1 }, { id: 2 }, { id: 3 }] };

    expect(actual).toEqual(expected);
  });

  it('calls Mongo database to retrieve practice problewms', () => {
    problemController.list(mockRequest, mockResponse);
  });
});
