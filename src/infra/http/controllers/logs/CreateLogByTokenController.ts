import { CreateLogByTokenInterface } from "@application/interfaces/use-cases/logs/CreateLogByTokenInterface";
import { ok, unauthorized } from "../../helpers/http";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { Validation } from "../../interfaces/Validation";
import { BaseController } from "../BaseController";
import { RoomAlreadyExistError } from "@application/errors/RoomAlreadyExistError";
import { SessionNotExistError } from "@application/errors/SessionNotExistError";



export class CreateLogByTokenController extends BaseController {

    constructor(
        private readonly createLogByTokenValidation: Validation,
        private readonly createLogByToken: CreateLogByTokenInterface
    ) {
        super(createLogByTokenValidation)
    }

    async execute(httpRequest: CreateLogByTokenController.Request): Promise<CreateLogByTokenController.Response> {
        const { token, flagKey, attachment, logType } = httpRequest.body!
        const idOrError = await this.createLogByToken.execute({
            attachment, token, flagKey, logType
        })
        if (idOrError instanceof SessionNotExistError) {
            return unauthorized(idOrError)
        } else {
            return ok({ id: idOrError })
        }

    }

}

export namespace CreateLogByTokenController {
    export type Request = HttpRequest<CreateLogByTokenInterface.Request>
    export type Response = HttpResponse<{ id: string } | SessionNotExistError>
}