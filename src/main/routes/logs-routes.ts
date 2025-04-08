import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeCreateLogController } from "@main/factories/controllers/logs/create-log/controller-factory";


export default(router: Router): void => {
    router.post('/log', authMiddleware, expressRouteAdapter(makeCreateLogController()))
}