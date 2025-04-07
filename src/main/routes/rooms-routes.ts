import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeCreateRoomController } from "@main/factories/controllers/rooms/create-room/controller-factory";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeGetRoomsController } from "@main/factories/controllers/rooms/get-rooms/controller-factory";


export default(router: Router): void => {
    router.post('/room', authMiddleware, expressRouteAdapter(makeCreateRoomController()))
    router.get('/rooms',authMiddleware, expressRouteAdapter(makeGetRoomsController()))
}