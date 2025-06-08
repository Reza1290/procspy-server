import { UpdateLogByIdInterface } from "@application/interfaces/use-cases/logs/UpdateLogByIdInterface";
import { ok, unauthorized } from "../../helpers/http";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { Validation } from "../../interfaces/Validation";
import { BaseController } from "../BaseController";
import { LogNotExistError } from "@application/errors/LogNotExistError";
import { Log } from "@domain/entities/Log";



export class UpdateLogByIdController extends BaseController {

    constructor(
        private readonly updateLogByIdValidation: Validation,
        private readonly updateLogById: UpdateLogByIdInterface
    ) {
        super(updateLogByIdValidation)
    }

    async execute(httpRequest: UpdateLogByIdController.Request): Promise<UpdateLogByIdController.Response> {
        const { id, logType } = httpRequest.body!
        const idOrError = await this.updateLogById.execute({id, logType})
        if (idOrError instanceof LogNotExistError) {
            return unauthorized(idOrError)
        } else {
            return ok(idOrError)
        }

    }

}

export namespace UpdateLogByIdController {
    export type Request = HttpRequest<UpdateLogByIdInterface.Request>
    export type Response = HttpResponse<Log | LogNotExistError>
}