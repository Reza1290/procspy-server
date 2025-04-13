import { SessionNotExistError } from "@application/errors/SessionNotExistError";
import { UnauthorizedError } from "../../../errors/UnauthorizedError";
import { UseCase } from "../UseCase";
import { ProctoredUser } from "@domain/entities/ProctoredUser";
import { Session } from "@domain/entities/Session";


export interface SignInProctoredUserInterface extends UseCase<SignInProctoredUserInterface.Request, SignInProctoredUserInterface.Response>{

    execute(credentials: SignInProctoredUserInterface.Request): Promise<SignInProctoredUserInterface.Response>
    
}

export namespace SignInProctoredUserInterface{
    export type Request = { token: string }
    export type Response = {session: Session , user: ProctoredUser} | SessionNotExistError
}