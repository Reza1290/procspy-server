import { Flag } from "@domain/entities/Flag"
import { UseCase } from "../UseCase"


export interface CreateFlagInterface extends UseCase<CreateFlagInterface.Request, CreateFlagInterface.Response>{

    execute(credentials: CreateFlagInterface.Request): Promise<CreateFlagInterface.Response>
    
}

export namespace CreateFlagInterface{
    export type Request = Omit<Flag, 'id' >
    export type Response = string | Error
}