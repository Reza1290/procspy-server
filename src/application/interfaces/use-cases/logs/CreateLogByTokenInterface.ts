import { Room } from "@domain/entities/Room";
import { UseCase } from "../UseCase";
import { RoomAlreadyExistError } from "@application/errors/RoomAlreadyExistError";
import { Log, logType } from "@domain/entities/Log";
import { SessionNotExistError } from "@application/errors/SessionNotExistError";


export interface CreateLogByTokenInterface extends UseCase<CreateLogByTokenInterface.Request, CreateLogByTokenInterface.Response>{

    execute(credentials: CreateLogByTokenInterface.Request): Promise<CreateLogByTokenInterface.Response>
    
}

export namespace CreateLogByTokenInterface{
    export type Request = { token: string, flagKey: string, attachment: string, logType: logType}
    export type Response = string | SessionNotExistError
}