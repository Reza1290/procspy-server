import { LogNotExistError } from "@application/errors/LogNotExistError"
import { SessionNotExistError } from "@application/errors/SessionNotExistError"
import { UpdateLogRepository } from "@application/interfaces/repositories/logs/UpdateLogRepository"
import { GetSessionByIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByIdRepository"
import { UpdateLogByIdInterface } from "@application/interfaces/use-cases/logs/UpdateLogByIdInterface"



export class UpdateLogById implements UpdateLogByIdInterface {
    constructor(
        private readonly updateLogRepository: UpdateLogRepository,
    ) { }

    async execute(body: UpdateLogByIdInterface.Request): Promise<UpdateLogByIdInterface.Response> {
        const { id, logType } = body
        
        if(!["True","False"].includes(logType)){
            return new LogNotExistError()
        }

        console.log(logType)

        const updatedLog = await this.updateLogRepository.updateLog({id, logType})
        if(!updatedLog){
            return new LogNotExistError()
        }
        
        return updatedLog
    }
}