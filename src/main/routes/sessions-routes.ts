import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeCreateSessionController } from "@main/factories/controllers/sessions/create-session/controller-factory";
import { makeGetSessionsByProctoredUserIdController } from "@main/factories/controllers/sessions/get-sessions-by-proctored-user-id/controller-factory";
import { makeUpdateSessionStatusController } from "@main/factories/controllers/sessions/update-session-status/controller-factory";
import { webrtcMiddleware } from "@main/middlewares/webrtc-middleware";


export default(router: Router): void => {
    router.post('/session', authMiddleware, expressRouteAdapter(makeCreateSessionController()))
    router.get('/sessions/:proctoredUserId', authMiddleware, expressRouteAdapter(makeGetSessionsByProctoredUserIdController()))
    router.post('/session/user-update', authMiddleware, expressRouteAdapter(makeUpdateSessionStatusController()))
    router.post('/session/server-update', webrtcMiddleware, expressRouteAdapter(makeUpdateSessionStatusController()))
}