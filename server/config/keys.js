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
  mongoURI,
  secretOrKey: `${process.env.SECRET_OR_KEY}`
}