import { Room } from "@domain/entities/Room";
import { UseCase } from "../UseCase";
import { RoomAlreadyExistError } from "@application/errors/RoomAlreadyExistError";
import { EntityNotFoundError } from "@application/errors/EntityNotFoundError";


export interface GetRoomsInterface extends UseCase<GetRoomsInterface.Request, GetRoomsInterface.Response>{

    execute(params: GetRoomsInterface.Request): Promise<GetRoomsInterface.Response>
    
}

export namespace GetRoomsInterface{
    export type Request = { page?: number };
  export type Response = { data: Room[], page: number, total: number, totalPages: number };
}