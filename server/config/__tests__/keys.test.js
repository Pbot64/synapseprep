import mockedEnv from 'mocked-env';
import keys from '../keys';

describe('Keys', () => {
  const clear = [{ clear: true }];
  describe('Mongo connection string', () => {
    it('should set username', () => {
      mockedEnv(
        {
          MONGO_USERNAME: 'fatboy'
        },
        // { clear: true }
        ...clear
      );

      const connectionString = 'mongodb://fatboy@localhost';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set username and password', () => {
      mockedEnv(
        {
          MONGO_USERNAME: 'fatboy',
          MONGO_PASS: 'secret'
        },
        ...clear
      );

      const connectionString = 'mongodb://fatboy:secret@localhost';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set host', () => {
      mockedEnv(
        {
          MONGO_HOST: 'mongo.com'
        },
        ...clear
      );

      const connectionString = 'mongodb://mongo.com';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set database', () => {
      mockedEnv(
        {
          MONGO_DATABASE: 'app'
        },
        ...clear
      );

      const connectionString = 'mongodb://localhost/app';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set replica set', () => {
      mockedEnv(
        {
          MONGO_REPLICAS: 'mongo-2.com, mongo-3.com'
        },
        ...clear
      );

      const connectionString = 'mongodb://localhost,mongo-2.com,mongo-3.com';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set ssl', () => {
      mockedEnv(
        {
          MONGO_SSL: 'true'
        },
        ...clear
      );
      const connectionString = 'mongodb://localhost/?ssl=true';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set authSource', () => {
      mockedEnv(
        {
          MONGO_AUTH_SOURCE: 'admin'
        },
        ...clear
      );
      const connectionString = 'mongodb://localhost/?authSource=admin';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should set retryWrites', () => {
      mockedEnv(
        {
          MONGO_RETRY_WRITES: 'true'
        },
        ...clear
      );
      const connectionString = 'mongodb://localhost/?retryWrites=true';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should combine options', () => {
      mockedEnv(
        {
          MONGO_SSL: 'true',
          MONGO_AUTH_SOURCE: 'admin',
          MONGO_RETRY_WRITES: 'true'
        },
        ...clear
      );
      const connectionString = 'mongodb://localhost/?ssl=true&authSource=admin&retryWrites=true';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });

    it('should not have options', () => {
      mockedEnv({}, ...clear);
      const connectionString = 'mongodb://localhost';
      expect(keys.getMongoUri()).toEqual(connectionString);
    });
  });
});
