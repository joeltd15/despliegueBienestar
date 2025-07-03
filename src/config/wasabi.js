const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: new AWS.Endpoint('https://s3.us-east-1.wasabisys.com'),
  accessKeyId: 'YWNGXAZB4OEUJ3GQE1T9',
  secretAccessKey: 'TcM8I0vzSWtAgUyVqNUEaHOTLe9SizYWOu27KeD8',
  region: 'us-east-1',
  signatureVersion: 'v4',
});

module.exports = s3;
