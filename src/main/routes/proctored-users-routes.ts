import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeCreateProctoredUserController } from "@main/factories/controllers/proctored-users/create-proctored-user/controller-factory";
import { makeGetProctoredUsersController } from "@main/factories/controllers/proctored-users/get-proctored-users/controller-factory";
import { makeGetProctoredUserDetailLogByTokenController } from "@main/factories/controllers/etc/get-proctored-user-detail-log-by-token/controller-factory";


export default(router: Router): void => {
    router.post('/proctored-user', authMiddleware, expressRouteAdapter(makeCreateProctoredUserController()))
    router.get('/proctored-users',authMiddleware, expressRouteAdapter(makeGetProctoredUsersController()))
    router.get('/proctored-user/:token', authMiddleware, expressRouteAdapter(makeGetProctoredUserDetailLogByTokenController()))
}