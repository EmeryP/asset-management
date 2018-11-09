const express = require('express');
console.log('in the app');
import authRouter from './auth/router.js';
import notFound from './middleware/404.js';
import error from './middleware/error.js';
import uploadRouter from './routes/upload.js';

const app = express();

app.use(express.json());

app.use(authRouter);
app.use(uploadRouter);
app.use(notFound);
app.use(error);

let server;

module.exports =  {
  app,
  start: (port) => {
    server = app.listen(port, () => console.log('Listening on port ' + port));
  },
  stop: () => {
    server.close( () => {
      console.log('Server has been stopped');
    });
  },
};




