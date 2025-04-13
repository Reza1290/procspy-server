import { Session } from "@domain/entities/Session";
import { UseCase } from "../UseCase";
import { SessionAlreadyExistError } from "@application/errors/SessionAlreadyExistError";


export interface GetSessionsByProctoredUserIdInterface extends UseCase<GetSessionsByProctoredUserIdInterface.Request, GetSessionsByProctoredUserIdInterface.Response>{

    execute(credentials: GetSessionsByProctoredUserIdInterface.Request): Promise<GetSessionsByProctoredUserIdInterface.Response>
    
}

export namespace GetSessionsByProctoredUserIdInterface{
    export type Request = {proctoredUserId: string, page?: number };
      export type Response = { data: Session[], page: number, total: number, totalPages: number };
}