import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapCollection, mapDocument, objectIdToString } from "../helpers/mapper";
import { GetRoomByRoomIdRepository } from "@application/interfaces/repositories/rooms/GetRoomByIdRepository";
import { CreateRoomRepository } from "@application/interfaces/repositories/rooms/CreateRoomRepository";
import { GetRoomsRepository } from "@application/interfaces/repositories/rooms/GetRoomsRepository";




export class RoomRepository implements
    CreateRoomRepository,
    GetRoomByRoomIdRepository {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('rooms')
    }

    async createRoom(roomData: CreateRoomRepository.Request): Promise<CreateRoomRepository.Response> {
        const collection = await RoomRepository.getCollection()
        const { insertedId } = await collection.insertOne({ ...roomData, createdAt: new Date() })
        return objectIdToString(insertedId)
    }

    async getRoomByRoomId(roomId: GetRoomByRoomIdRepository.Request): Promise<GetRoomByRoomIdRepository.Response> {
        const collection = await RoomRepository.getCollection()
        const rawRoom = await collection.findOne({ roomId })
        return rawRoom && mapDocument(rawRoom)
    }

    async getRooms(params: GetRoomsRepository.Request): Promise<GetRoomsRepository.Response> {
        const collection = await RoomRepository.getCollection()
        const { page, paginationLimit } = params
        const offset = (page - 1) * paginationLimit
        const rawRooms = await collection.find({})
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(paginationLimit)
            .toArray()

        const rooms = mapCollection(rawRooms)

        const total = await collection.countDocuments({})
        const totalPages = Math.ceil(total / paginationLimit)
        return {
            data: rooms, page, total, totalPages,
        };
    }
}