import { Session } from "@domain/entities/Session"


export interface GetSessionByProctoredUserIdRepository{
    getSessionByProctoredUserId(proctoredUserId: GetSessionByProctoredUserIdRepository.Request): Promise<GetSessionByProctoredUserIdRepository.Response>
}

export namespace GetSessionByProctoredUserIdRepository {
    export type Request = string
    export type Response = Session | null
}