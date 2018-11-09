//nitty gritty AWS stuff

import fs from 'fs-extra'; //allows us to remove a file
import aws from 'aws-sdk';

const s3 = new aws.S3();

const uploadFile = (filepath, key) => {
  let config = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fs.createReadStream(filepath),

  };

  return s3.upload(config)
    .promise()
    .then(result => {
      fs.remove(filepath)
        .then(() => result.Location); //this line will resolve to be a URL from AWS
    })
    .catch(err => {
      console.error(err);
      return fs.remove(filepath);
    });

};

export default { uploadFile };