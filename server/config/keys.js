import mongoUriBuilder from 'mongo-uri-builder';
import dotenv from 'dotenv';

dotenv.config();

const replicas = [
  { host: `synapseprepcluster-shard-00-01-xfwt7.azure.mongodb.net`, port: 27017 },
  { host: `synapseprepcluster-shard-00-02-xfwt7.azure.mongodb.net`, port: 27017 }
];
function getConnectionString() {
  return mongoUriBuilder({
    username: `${process.env.MONGO_USERNAME}`,
    password: `${process.env.MONGO_PASS}`,
    host: `${process.env.MONGO_HOST}`,
    port: `27017`,
    // replicas,
    database: 'test',
    options: {
      ssl: true,
      authSource: 'admin',
      retryWrites: true
    }
  });
}

module.exports = {
  mongoURI: getConnectionString(),
  getMongoUri: getConnectionString,
  secretOrKey: `${process.env.SECRET_OR_KEY}`,
  emailUser: `${process.env.EMAIL_USER}`,
  emailPassword: `${process.env.EMAIL_PASSWORD}`
};
