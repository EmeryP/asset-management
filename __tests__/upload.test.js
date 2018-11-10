'use strict';

require('dotenv').config();

import supergoose, { startDB, stopDB } from './supergoose.js';
import { app } from '../src/app';

const mockRequest = supergoose(app);

beforeAll(startDB);
afterAll(stopDB);

process.env.APP_SECRET = 'password';
process.env.AWS_BUCKET = 'em-lab19-two';

describe('/upload route', () => {
  
  it('should upload a file', (done) => {
    return mockRequest.post('/upload')
      .attach('img', `${__dirname}/assets/this-is-fine.jpeg`)
      .then(response => {
        expect(response.status).toEqual(200);
        done();
      })
      .catch(console.error);
  });
});