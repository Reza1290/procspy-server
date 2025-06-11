import 'module-alias/register';
import fs from 'fs';
import httpolyglot, { createServer } from '@httptoolkit/httpolyglot';
import dbConnection from '../infra/db/mongodb/helpers/db-connection';
import env from './config/env';
import setupApp from './config/app';
import { ok } from 'assert';
import path from 'path';
import 'dotenv/config'


dbConnection.connect(env.mongodbUrl)
  .then(async () => {
    await dbConnection.migration()

    const app = setupApp();

    const httpsOptions = {
      key: fs.readFileSync(__dirname + '../../../certs/key.pem'),
      cert: fs.readFileSync(__dirname + '../../../certs/cert.pem'),
    };

    createServer(httpsOptions, app) // Use createServer directly
      .listen(env.port, () => {
        console.log(`✅ HTTP/HTTPS server running on port ${env.port}`);
        console.log(`   Try:`);
        console.log(`   - http://localhost:${env.port}`);
        console.log(`   - https://localhost:${env.port}`);
      });
  })
  .catch(console.error);