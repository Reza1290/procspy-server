import { GetGlobalSettingsInterface } from "@application/interfaces/use-cases/global-settings/GetProctoredUsersInterface";
import { ok, unauthorized } from "../../helpers/http";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { Validation } from "../../interfaces/Validation";
import { BaseController } from "../BaseController";



export class GetGlobalSettingsController extends BaseController {

    constructor(
        private readonly getGlobalSettingsValidation: Validation,
        private readonly getGlobalSettings: GetGlobalSettingsInterface
    ) {
        super(getGlobalSettingsValidation)
    }

    async execute(httpRequest: GetGlobalSettingsController.Request): Promise<GetGlobalSettingsController.Response> {
        console.log(httpRequest)
        const { page } = httpRequest.params!
        const response = await this.getGlobalSettings.execute({ page })
        return ok(response)

    }

}

export namespace GetGlobalSettingsController {
    export type Request = HttpRequest<undefined, { page?: number }>
    export type Response = HttpResponse<GetGlobalSettingsInterface.Response>
}