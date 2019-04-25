import mockedEnv from 'mocked-env';
import keys from '../keys';

describe('keys', () => {
  const mongoURI =
    'mongodb://username:password@mongo.com:27017/test?ssl=true&authSource=admin&retryWrites=true';

  beforeEach(() => {
    mockedEnv(
      {
        MONGO_USERNAME: 'username',
        MONGO_PASS: 'password',
        MONGO_HOST: 'mongo.com'
      },
      { clear: true }
    );
  });

  it('should export mongo Uri connection string', () => {
    const connectionString = keys.getMongoUri();
    expect(connectionString).toEqual(mongoURI);
  });

  it('should default to synapse prep replica sets', () => {
    throw new Error('not done.');
  });

  it('should use process env setting for replica sets', () => {
    throw new Error('not done.');
  });
});
