import { Router } from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { authMiddleware } from "@main/middlewares/auth-middleware";
import { makeCreateGlobalSettingController } from "@main/factories/controllers/global-settings/create-global-setting/controller-factory";
import { makeGetGlobalSettingsController } from "@main/factories/controllers/global-settings/get-global-settings/controller-factory";


export default(router: Router): void => {
    router.post('/global-setting', authMiddleware, expressRouteAdapter(makeCreateGlobalSettingController()))
    router.get('/global-settings', authMiddleware, expressRouteAdapter(makeGetGlobalSettingsController()))
}