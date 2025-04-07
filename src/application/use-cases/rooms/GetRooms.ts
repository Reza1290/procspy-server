import { paginationConfig } from "@application/config/pagination";
import { GetRoomsRepository } from "@application/interfaces/repositories/rooms/GetRoomsRepository"
import { GetRoomsInterface } from "@application/interfaces/use-cases/rooms/GetRoomsInterface"


export class GetRooms implements GetRoomsInterface {
    constructor(
        private readonly getRoomsRepository: GetRoomsRepository,
    ) { }

    async execute(body: GetRoomsInterface.Request): Promise<GetRoomsInterface.Response> {
        const { page = 1 } = body
        const { paginationLimit } = paginationConfig;


        return this.getRoomsRepository.getRooms({page, paginationLimit})
    }
}