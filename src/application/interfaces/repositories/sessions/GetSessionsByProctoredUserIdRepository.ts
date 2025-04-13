import { Session } from "@domain/entities/Session"


export interface GetSessionsByProctoredUserIdRepository{
    getSessionsByProctoredUserId(proctoredUserId: GetSessionsByProctoredUserIdRepository.Request): Promise<GetSessionsByProctoredUserIdRepository.Response>
}

export namespace GetSessionsByProctoredUserIdRepository {
    export type Request  = {proctoredUserId: string, page: number, paginationLimit: number }
        export type Response =  { data: Session[], page: number, total: number, totalPages: number };
}