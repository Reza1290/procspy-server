import { Express } from "express"
import { bodyParser } from "../middlewares/body-parser"
import { contentType } from "../middlewares/content-type"
import cors from "../middlewares/cors"
import corsMiddleware from "../middlewares/cors"

export default (app: Express): void => {
    app.use(bodyParser)
    app.use(corsMiddleware)
    app.use(contentType)
}