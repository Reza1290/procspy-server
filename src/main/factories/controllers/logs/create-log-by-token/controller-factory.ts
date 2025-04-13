import { BaseController } from "@infra/http/controllers/BaseController"
import { CreateLogByTokenController } from "@infra/http/controllers/logs/CreateLogByTokenController"
import { makeCreateLogByTokenValidation } from "./validation-factory"
import { makeCreateLogByToken } from "@main/factories/use-cases/logs/create-log-by-token-factory"


export const makeCreateLogByTokenController = (): BaseController => {
    const validation = makeCreateLogByTokenValidation()
    const useCase = makeCreateLogByToken()

    return new CreateLogByTokenController(validation, useCase)
}