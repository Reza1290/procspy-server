import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeSignInController } from "../factories/controllers/authentication/sign-in/controller-factory";


export default(router: Router): void => {
    router.post('/login', expressRouteAdapter(makeSignInController()))
}