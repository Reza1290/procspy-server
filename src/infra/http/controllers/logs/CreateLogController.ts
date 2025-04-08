import { CreateLogInterface } from "@application/interfaces/use-cases/logs/CreateLogIntreface";
import { ok, unauthorized } from "../../helpers/http";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { Validation } from "../../interfaces/Validation";
import { BaseController } from "../BaseController";
import { RoomAlreadyExistError } from "@application/errors/RoomAlreadyExistError";
import { SessionNotExistError } from "@application/errors/SessionNotExistError";



export class CreateLogController extends BaseController {

    constructor(
        private readonly createRoomValidation: Validation,
        private readonly createRoom: CreateLogInterface
    ) {
        super(createRoomValidation)
    }

    async execute(httpRequest: CreateLogController.Request): Promise<CreateLogController.Response> {
        const { sessionId, flagKey, message } = httpRequest.body!
        const idOrError = await this.createRoom.execute({
            message, sessionId, flagKey
        })
        if (idOrError instanceof SessionNotExistError) {
            return unauthorized(idOrError)
        } else {
            return ok({ id: idOrError })
        }

    }

}

export namespace CreateLogController {
    export type Request = HttpRequest<CreateLogInterface.Request>
    export type Response = HttpResponse<{ id: string } | SessionNotExistError>
}