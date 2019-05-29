/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import problemController from '../problemController';

describe('Problem api', () => {
  it('can get create the Problem controller', () => {
    expect(problemController.list).toBeDefined();
  });

  it('can list practice problems', () => {
    const mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: '/problems/'
    });
    const mockResponse = httpMocks.createResponse();
    problemController.list(mockRequest, mockResponse);
    const actual = mockResponse._getData();
    const expected = { data: [{ id: 1 }, { id: 2 }, { id: 3 }] };

    expect(actual).toEqual(expected);
  });
});
