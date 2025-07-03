const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.WASABI_REGION,
  endpoint: process.env.WASABI_ENDPOINT,
  credentials: {
    accessKeyId: process.env.WASABI_ACCESS_KEY,
    secretAccessKey: process.env.WASABI_SECRET_KEY,
  },
});

const generateSignedUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.WASABI_BUCKET,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 300 }); // 5 minutos
};

module.exports = { generateSignedUrl };
