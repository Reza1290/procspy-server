import { ok, unauthorized } from "../../helpers/http";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { Validation } from "../../interfaces/Validation";
import { BaseController } from "../BaseController";
import { RoomAlreadyExistError } from "@application/errors/RoomAlreadyExistError";
import { CreateOrUpdateSessionDetailInterface } from "@application/interfaces/use-cases/session-details/CreateOrUpdateSessionDetailInterface";



export class CreateOrUpdateSessionDetailController extends BaseController {

    constructor(
        private readonly createOrUpdateSessionDetailValidation: Validation,
        private readonly createOrUpdateSessionDetail: CreateOrUpdateSessionDetailInterface
    ) {
        super(createOrUpdateSessionDetailValidation)
    }

    async execute(httpRequest: CreateOrUpdateSessionDetailController.Request): Promise<CreateOrUpdateSessionDetailController.Response> {
        const body = httpRequest.body!
        const idOrError = await this.createOrUpdateSessionDetail.execute(body)
        
        if (idOrError instanceof RoomAlreadyExistError) {
            return unauthorized(idOrError)
        } else {
            return ok(idOrError)
        }

    }

}

export namespace CreateOrUpdateSessionDetailController {
    export type Request = HttpRequest<CreateOrUpdateSessionDetailInterface.Request>
    export type Response = HttpResponse<{ id: string } | RoomAlreadyExistError>
}