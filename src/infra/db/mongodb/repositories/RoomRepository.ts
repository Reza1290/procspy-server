import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapDocument, objectIdToString } from "../helpers/mapper";
import { GetRoomByRoomIdRepository } from "@application/interfaces/repositories/rooms/GetRoomByIdRepository";
import { CreateRoomRepository } from "@application/interfaces/repositories/rooms/CreateRoomRepository";




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
}