import 'module-alias/register'
import fs from 'fs'
import https from 'https'
import dbConnection from '../infra/db/mongodb/helpers/db-connection'
import env from './config/env'
import setupApp from './config/app'

const httpsOptions = {
  key: fs.readFileSync(__dirname +'../../../certs/key.pem'),
  cert: fs.readFileSync(__dirname + '../../../certs/cert.pem'),
}

dbConnection.connect(env.mongodbUrl).then(async () => {
  const app = setupApp()

  https.createServer(httpsOptions, app).listen(env.port, () => {
    console.log(`✅ HTTPS server running at https://localhost:${env.port}`)
  })
}).catch(console.error)
