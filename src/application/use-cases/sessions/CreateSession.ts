import { EntityNotFoundError } from "@application/errors/EntityNotFoundError"
import { SessionAlreadyExistError } from "@application/errors/SessionAlreadyExistError"
import { CreateSessionRepository } from "@application/interfaces/repositories/sessions/CreateSessionRepository"
import { GetSessionByProctoredUserIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByProctoredUserIdRepository"
import { CreateSessionInterface } from "@application/interfaces/use-cases/sessions/CreateSessionInterface"
import { SessionStatus } from "@domain/entities/Session"


export class CreateSession implements CreateSessionInterface {
    constructor(
        private readonly createSessionRepository: CreateSessionRepository,
        private readonly getSessionByProctoredUserIdRepository: GetSessionByProctoredUserIdRepository,
    ) { }

    async execute(body: CreateSessionInterface.Request): Promise<CreateSessionInterface.Response> {
        const { proctoredUserId, roomId } = body
        
        const session = await this.getSessionByProctoredUserIdRepository.getSessionByProctoredUserId(proctoredUserId)
        
        if(session){
            return new SessionAlreadyExistError()
        }

        const newSession = await this.createSessionRepository.createSession({
            roomId: roomId,
            proctoredUserId: proctoredUserId,
            status: SessionStatus.Ongoing
        })

        return newSession
    }
}