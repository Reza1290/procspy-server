import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateRoomController } from "@main/factories/controllers/rooms/create-room/controller-factory";
import { authMiddleware } from "@main/middlewares/auth-middleware";


export default(router: Router): void => {
    router.post('/room', authMiddleware, expressRouteAdapter(makeCreateRoomController()))
}