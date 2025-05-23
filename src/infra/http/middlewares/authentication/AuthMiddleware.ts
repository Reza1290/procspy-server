import { ForbiddenError } from "../../../../application/errors/ForbiddenError";
import { AuthenticateInterface } from "../../../../application/interfaces/use-cases/authentication/AuthenticateInterface";
import { AuthTokenNotProvidedError } from "../../errors/AuthTokenNotProvidedError";
import { InvalidAuthTokenError } from "../../errors/InvalidAuthTokenError";
import { forbidden, ok } from "../../helpers/http";
import { HttpRequest } from "../../interfaces/HttpRequest";
import { HttpResponse } from "../../interfaces/HttpResponse";
import { BaseMiddleware } from "../BaseMiddleware";



export class AuthMiddleware extends BaseMiddleware {
    constructor(
        private readonly authenticate: AuthenticateInterface
    ) {
        super()
    }


    async execute(httpRequest: AuthMiddleware.Request): Promise<AuthMiddleware.Response> {
        const authHeader = httpRequest.headers?.authorization

        if (!authHeader) {
            return forbidden(new AuthTokenNotProvidedError())
        }

        const [, authToken] = authHeader.split(' ')
        const userIdOrError = await this.authenticate.execute(authToken)
        if (userIdOrError instanceof ForbiddenError) {
            return forbidden(new InvalidAuthTokenError(authToken))

        }

        return ok({
            userId: userIdOrError
        })
    }
}

export namespace AuthMiddleware {
    export type Request = HttpRequest<undefined, undefined, { authorization: string }>
    export type Response = HttpResponse<{ userId: string } | AuthTokenNotProvidedError | InvalidAuthTokenError>
}