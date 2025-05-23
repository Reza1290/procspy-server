import { SessionNotExistError } from "@application/errors/SessionNotExistError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { UseCase } from "../UseCase";
import { ProctoredUser } from "@domain/entities/ProctoredUser";
import { Session } from "@domain/entities/Session";
import { GlobalSetting } from "@domain/entities/GlobalSetting";


export interface SignInProctoredUserInterface extends UseCase<SignInProctoredUserInterface.Request, SignInProctoredUserInterface.Response>{

    execute(credentials: SignInProctoredUserInterface.Request): Promise<SignInProctoredUserInterface.Response>
    
}

export namespace SignInProctoredUserInterface{
    export type Request = { token: string }
    export type Response = {session: Omit<Session, 'id'> , user: Omit<ProctoredUser, 'id'>, settings: Record<string,GlobalSetting>} | SessionNotExistError
}