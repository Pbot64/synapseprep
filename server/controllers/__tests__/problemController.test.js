/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import { list } from '../problemController';

describe('Problem api', () => {
  it('can get create the Problem controller', () => {
    expect(list).toBeDefined();
  });

  it('can list practice problems', () => {
    const mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: '/problems/'
    });
    const mockResponse = httpMocks.createResponse();
    list(mockRequest, mockResponse);
    const actual = mockResponse._getData();
    const expected = 'asdf';

    expect(actual).toEqual(expected);
  });
});
