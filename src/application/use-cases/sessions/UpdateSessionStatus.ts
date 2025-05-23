import { paginationConfig } from "@application/config/pagination";
import { SessionLockedError } from "@application/errors/SesionLockedError";
import { SessionNotExistError } from "@application/errors/SessionNotExistError";
import { GetSessionByIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByIdRepository";
import { GetSessionByTokenRepository } from "@application/interfaces/repositories/sessions/GetSessionByTokenRepository";
import { UpdateSessionStatusRepository } from "@application/interfaces/repositories/sessions/UpdateSessionStatusRepository";
import { UpdateSessionStatusInterface } from "@application/interfaces/use-cases/sessions/UpdateSessionStatusInterface";
import { SessionStatus } from "@domain/entities/Session";


export class UpdateSessionStatus implements UpdateSessionStatusInterface {
    constructor(
        private readonly getSessionByTokenRepository: GetSessionByTokenRepository,
        private readonly updateSessionStatusRepository: UpdateSessionStatusRepository,
    ) { }

    async execute(token: UpdateSessionStatusInterface.Request): Promise<UpdateSessionStatusInterface.Response> {
        
        const session = await this.getSessionByTokenRepository.getSessionByToken(token)
        if (!session) {
            return new SessionNotExistError()
        }
        let updatedSession = null
        let status = SessionStatus.Scheduled
        if (session.status === SessionStatus.Scheduled) {
            status = SessionStatus.Ongoing
            updatedSession = await this.updateSessionStatusRepository.updateSessionStatus({ token, status, startTime: (new Date()).toISOString() })
            console.log(updatedSession)
        } else if (session.status === SessionStatus.Ongoing) {
            status = SessionStatus.Completed
            updatedSession = await this.updateSessionStatusRepository.updateSessionStatus({ token, status, endTime: (new Date()).toISOString() })
            console.log(updatedSession)
        } else if (session.status === SessionStatus.Completed) {
            return new SessionLockedError()
        }
        console.log(updatedSession)
        if (!updatedSession) {
            return new SessionNotExistError()
        }
        return updatedSession
    }
}