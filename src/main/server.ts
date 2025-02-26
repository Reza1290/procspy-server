import 'module-alias/register'
import dbConnection from '../infra/db/mongodb/helpers/db-connection'
import env from './config/env'
import setupApp from './config/app'

dbConnection.connect(env.mongodbUrl).then(
    async () => {
        const app = setupApp()
        app.listen(env.port, () => {

            console.log(`Server Running ${env.port}`)
        })
    }
).catch(console.error)