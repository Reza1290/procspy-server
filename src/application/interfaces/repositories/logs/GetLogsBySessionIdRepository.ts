import { Log, LogProps } from "@domain/entities/Log"
import { RoomProps } from "../../../../domain/entities/Room"


export interface GetLogsBySessionIdRepository{
    getLogsBySessionId(sessionId: GetLogsBySessionIdRepository.Request): Promise<GetLogsBySessionIdRepository.Response>
}

export namespace GetLogsBySessionIdRepository {
    export type Request = string
    export type Response = Log[]
}