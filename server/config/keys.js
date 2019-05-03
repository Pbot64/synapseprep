import mongoUriBuilder from 'mongo-uri-builder';
import dotenv from 'dotenv';

dotenv.config();

function getConnectionString() {
  const replicas =
    process.env.MONGO_REPLICAS &&
    process.env.MONGO_REPLICAS.split(',').map(host => ({
      host: host.trim()
    }));

  const options = {
    ...(process.env.MONGO_SSL && { ssl: `${process.env.MONGO_SSL}` })
  };

  return mongoUriBuilder({
    ...(process.env.MONGO_USERNAME && { username: `${process.env.MONGO_USERNAME}` }),
    ...(process.env.MONGO_PASS && { password: `${process.env.MONGO_PASS}` }),
    ...(process.env.MONGO_HOST && { host: `${process.env.MONGO_HOST}` }),
    ...(process.env.MONGO_DATABASE && { database: process.env.MONGO_DATABASE }),
    ...(replicas && { replicas }),
    ...(Object.keys(options).length > 0 && { options })
  });
}

module.exports = {
  mongoURI: getConnectionString(),
  secretOrKey: `${process.env.SECRET_OR_KEY}`,
  emailUser: `${process.env.EMAIL_USER}`,
  emailPassword: `${process.env.EMAIL_PASSWORD}`
};
