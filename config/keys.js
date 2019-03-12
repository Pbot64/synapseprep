require('dotenv').config();
const uriBuilder = require('mongo-uri-builder');

const host = 
  process.env.MONGO_HOST ||
  "synapseprepcluster-shard-00-00-xfwt7.azure.mongodb.net:27017,synapseprepcluster-shard-00-01-xfwt7.azure.mongodb.net:27017,synapseprepcluster-shard-00-02-xfwt7.azure.mongodb.net:27017";
const ssl = process.env.MONGO_SSL || true;

const mongoURI = uriBuilder({
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASS,
  host,
  database: process.env.MONGO_DATABASE,
  options: {
    ssl,
    retryWrites: true
  }
});

module.exports = {
  //   `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@synapseprepcluster-shard-00-00-xfwt7.azure.mongodb.net:27017,synapseprepcluster-shard-00-01-xfwt7.azure.mongodb.net:27017,synapseprepcluster-shard-00-02-xfwt7.azure.mongodb.net:27017/test?ssl=true&replicaSet=Synapseprepcluster-shard-0&authSource=admin&retryWrites=true`,
  // `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/test?ssl=${ssl}&replicaSet=Synapseprepcluster-shard-0&authSource=admin&retryWrites=true`,
  // mongoURI: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${host}/admin?ssl=${ssl}&retryWrites=true`,
  mongoURI,
  secretOrKey: `${process.env.SECRET_OR_KEY}`

}
