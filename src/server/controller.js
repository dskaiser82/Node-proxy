require("dotenv").config();

var multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");

//File sent to Node Server
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {
  fileSendToServer: multer({ storage: storage }).single("file"),
  s3Upload: (fileObj, s3FolderPath, prodTrue) => {
    //AWS Creds
    AWS.config.update({
      region: !prodTrue ? process.env.NONPROD_REGION : process.env.PROD_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: !prodTrue
          ? process.env.NONPROD_IDENTITYPOOLID
          : process.env.PROD_REGION,
      }),
    });

    const readObject = new Promise((res, req) => {
      fs.readFile(fileObj.path, (err, result) => {
        console.log("Reading the file");
        res(result);
      });
    });

    //Set filename with TimeStamp
    timeStampFileName = `${fileObj.filename}?ts=${Date.now()}`;

    return readObject.then((data) => {
      if (data) {
        console.log(`${s3FolderPath}/${fileObj.filename}`);
        const params = {
          Bucket: !prodTrue
            ? process.env.NONPROD_BUCKETNAME
            : process.env.PROD_BUCKETNAME,
          Key: `test/${s3FolderPath}/${timeStampFileName}`,
          Body: data,
          ACL: "public-read",
        };
        const putObject = new AWS.S3({
          apiVersion: "2006-03-01",
        })
          .putObject(params)
          .promise();

        return putObject.then(() => {
          console.log("Uploaded file to S3");
          return timeStampFileName;
        });
      }
    });
  },
  s3Delete: (fileName, s3FolderPath) => {
    const s3 = new AWS.S3();
    const params = {
      Bucket: process.env.NONPROD_BUCKETNAME,
      Key: `test/${s3FolderPath}/${fileName}`,
    };

    s3.deleteObject(params, (err, data) => {
      if (err) console.log(err);
      else console.log("Deleted files ");
    });
  },
};
