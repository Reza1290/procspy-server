import authenticationRoutes from "@main/routes/authentication-routes"
import flagsRoutes from "@main/routes/flags-routes"
import logsRoutes from "@main/routes/logs-routes"
import proctoredUsersRoutes from "@main/routes/proctored-users-routes"
import roomsRoutes from "@main/routes/rooms-routes"
import sessionsRoutes from "@main/routes/sessions-routes"
import { Router, Express } from "express"


export default (app: Express): void => {
    const router = Router()
    app.use('/api',router)
    // routes goes here
    authenticationRoutes(router)
    roomsRoutes(router)
    sessionsRoutes(router)
    logsRoutes(router)
    flagsRoutes(router)
    proctoredUsersRoutes(router)
}