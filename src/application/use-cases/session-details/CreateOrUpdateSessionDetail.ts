import { paginationConfig } from "@application/config/pagination";
import { SessionLockedError } from "@application/errors/SesionLockedError";
import { SessionNotExistError } from "@application/errors/SessionNotExistError";
import { CreateOrUpdateSessionDetailRepository } from "@application/interfaces/repositories/session-details/CreateOrUpdateSessionDetail";
import { GetSessionByIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByIdRepository";
import { GetSessionByTokenRepository } from "@application/interfaces/repositories/sessions/GetSessionByTokenRepository";
import { CreateOrUpdateSessionDetailInterface } from "@application/interfaces/use-cases/session-details/CreateOrUpdateSessionDetailInterface";
import { SessionStatus } from "@domain/entities/Session";


export class CreateOrUpdateSessionDetail implements CreateOrUpdateSessionDetailInterface {
    constructor(
        private readonly CreateOrUpdateSessionDetailRepository: CreateOrUpdateSessionDetailRepository,
        private readonly GetSessionByTokenRepository: GetSessionByTokenRepository
    ) { }

    async execute(credentials: CreateOrUpdateSessionDetailInterface.Request): Promise<CreateOrUpdateSessionDetailInterface.Response> {
        const { token } = credentials
        const session = await this.GetSessionByTokenRepository.getSessionByToken(token)

        if (!session) {
            return new SessionNotExistError()
        }
        
        const sessionId = session.id

        if(session.status != SessionStatus.Scheduled){
            return new SessionLockedError()
        }
        const sessionDetail = await this.CreateOrUpdateSessionDetailRepository.createOrUpdateSessionDetail({...credentials, sessionId})

        return sessionDetail
    }
}