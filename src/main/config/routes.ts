import authenticationRoutes from "@main/routes/authentication-routes"
import roomsRoutes from "@main/routes/rooms-routes"
import { Router, Express } from "express"


export default (app: Express): void => {
    const router = Router()
    app.use('/api',router)
    // routes goes here
    authenticationRoutes(router)
    roomsRoutes(router)
}