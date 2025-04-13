import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeCreateSessionController } from "@main/factories/controllers/sessions/create-session/controller-factory";
import { makeGetSessionsByProctoredUserIdController } from "@main/factories/controllers/sessions/get-sessions-by-proctored-user-id/controller-factory";


export default(router: Router): void => {
    router.post('/session', authMiddleware, expressRouteAdapter(makeCreateSessionController()))
    router.get('/sessions/:proctoredUserId', authMiddleware, expressRouteAdapter(makeGetSessionsByProctoredUserIdController()))
}