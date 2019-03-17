/* eslint-disable no-underscore-dangle */
import httpMocks from 'node-mocks-http';
import problems from '../problemController';

describe('Problem api', () => {
  it('can get create the Problem controller', () => {
    expect(problems).toBeDefined();
  });

  it('can list practice problems', () => {
    const mockRequest = httpMocks.createRequest({
      method: 'GET',
      url: '/problems/asdf'
    });
    const mockResponse = httpMocks.createResponse();
    problems.list(mockRequest, mockResponse);
    const actual = mockResponse._getData();
    const expected = 'asdf';

    expect(actual).toEqual(expected);
  });
});
