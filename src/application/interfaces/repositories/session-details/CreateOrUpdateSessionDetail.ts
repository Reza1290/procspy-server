import { SessionDetail } from "@domain/entities/SessionDetail"


export interface CreateOrUpdateSessionDetailRepository{
    createOrUpdateSessionDetail(sessionDetailData: CreateOrUpdateSessionDetailRepository.Request): Promise<CreateOrUpdateSessionDetailRepository.Response>
}

export namespace CreateOrUpdateSessionDetailRepository {
    export type Request = Omit<SessionDetail, 'id' | 'createdAt' | 'updatedAt'>
    export type Response = SessionDetail
}