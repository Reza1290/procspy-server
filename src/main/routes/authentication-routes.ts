import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { makeSignInController } from "../factories/controllers/authentication/sign-in/controller-factory";
import { makeSignUpController } from "@main/factories/controllers/authentication/sign-up/controller-factory";


export default(router: Router): void => {
    router.post('/login', expressRouteAdapter(makeSignInController()))
    router.post('/register', expressRouteAdapter(makeSignUpController()))
}