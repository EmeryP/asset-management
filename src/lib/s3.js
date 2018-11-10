'use strict';

import fse from 'fs-extra';
import aws from 'aws-sdk';

const s3 = new aws.S3();

const uploadFile = (filepath, key) => { 
  let config = { 
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    ACL: 'public-read',
    Body: fse.createReadStream(filepath),
  };
  console.log('config', filepath);
  console.log('config', config.Body);

  return s3.upload(config)
    .promise() 
    .then(result => { 
      console.log('result', result);
      fse.remove(filepath) 

        .then(() => result.Location);
    })
    .catch(err => {
      console.error(err);
      return fse.remove(filepath)
        .then(() => Promise.reject(err));
    });
};

export default { uploadFile };