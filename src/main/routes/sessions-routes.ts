import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeCreateSessionController } from "@main/factories/controllers/sessions/create-session/controller-factory";


export default(router: Router): void => {
    router.post('/session', authMiddleware, expressRouteAdapter(makeCreateSessionController()))
}