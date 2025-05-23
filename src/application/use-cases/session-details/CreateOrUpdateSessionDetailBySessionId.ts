import { paginationConfig } from "@application/config/pagination";
import { SessionLockedError } from "@application/errors/SesionLockedError";
import { SessionNotExistError } from "@application/errors/SessionNotExistError";
import { CreateOrUpdateSessionDetailRepository } from "@application/interfaces/repositories/session-details/CreateOrUpdateSessionDetail";
import { GetSessionByIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByIdRepository";
import { CreateOrUpdateSessionDetailInterface } from "@application/interfaces/use-cases/session-details/CreateOrUpdateSessionDetailInterface";
import { SessionStatus } from "@domain/entities/Session";


export class CreateOrUpdateSessionDetail implements CreateOrUpdateSessionDetailInterface {
    constructor(
        private readonly CreateOrUpdateSessionDetailRepository: CreateOrUpdateSessionDetailRepository,
        private readonly GetSessionByIdRepository: GetSessionByIdRepository
    ) { }

    async execute(credentials: CreateOrUpdateSessionDetailInterface.Request): Promise<CreateOrUpdateSessionDetailInterface.Response> {
        const { sessionId } = credentials
        const session = await this.GetSessionByIdRepository.getSessionById(sessionId)

        if (!session) {
            return new SessionNotExistError()
        }

        

        if(session.status != SessionStatus.Scheduled){
            return new SessionLockedError()
        }
        const sessionDetail = await this.CreateOrUpdateSessionDetailRepository.createOrUpdateSessionDetail(credentials)

        return sessionDetail
    }
}