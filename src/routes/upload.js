
import express from 'express';
import multer from 'multer'; 

import s3 from '../lib/s3.js';

const uploadRouter = express.Router(); 

const uploader = multer({ dest: `${__dirname}/../../tmp` }); 

uploadRouter.post('/upload', uploader.any(), (request, response) => {
  console.log('request.files', request.files);

  if (request.files.length > 1) { 
    return 'too many files';
  }

  let file = request.files[0]; 
  let key = `${file.filename}:${file.originalname}`; 


  s3.uploadFile(file.path, key)
    .then(url => { 
      let output = { url: url }; 
      response.send(output); 
    })
    .catch(console.error);
});

export default uploadRouter;
