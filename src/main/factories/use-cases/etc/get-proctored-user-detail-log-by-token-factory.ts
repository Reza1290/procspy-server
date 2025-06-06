import { GetProctoredUserDetailLogByTokenInterface } from "@application/interfaces/use-cases/etc/GetProctoredUserDetailLogByTokenInterface"
import { CreateLogByTokenInterface } from "@application/interfaces/use-cases/logs/CreateLogByTokenInterface"
import { GetProctoredUserDetailLogByToken } from "@application/use-cases/etc/GetProctoredUserDetailLogByToken"
import { CreateLog } from "@application/use-cases/logs/CreateLog"
import { CreateLogByToken } from "@application/use-cases/logs/CreateLogByToken"
import { LogRepository } from "@infra/db/mongodb/repositories/LogRepository"
import { ProctoredUserRepository } from "@infra/db/mongodb/repositories/ProctoredUserRepository"
import { RoomRepository } from "@infra/db/mongodb/repositories/RoomRepository"
import { SessionRepository } from "@infra/db/mongodb/repositories/SessionRepository"


export const makeGetProctoredUserDetailLogByToken = (): GetProctoredUserDetailLogByTokenInterface => {
    const sessionRepo = new SessionRepository()
    const proctoredUserRepo = new ProctoredUserRepository()

    return new GetProctoredUserDetailLogByToken(sessionRepo, proctoredUserRepo)
}