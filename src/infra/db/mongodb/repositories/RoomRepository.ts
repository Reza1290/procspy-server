import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapCollection, mapDocument, objectIdToString, stringToObjectId } from "../helpers/mapper";
import { GetRoomByRoomIdRepository } from "@application/interfaces/repositories/rooms/GetRoomByRoomIdRepository";
import { CreateRoomRepository } from "@application/interfaces/repositories/rooms/CreateRoomRepository";
import { GetRoomsRepository } from "@application/interfaces/repositories/rooms/GetRoomsRepository";
import { UpdateRoomRepository } from "@application/interfaces/repositories/rooms/UpdateRoomRepository";
import { GetRoomByIdRepository } from "@application/interfaces/repositories/rooms/GetRoomByIdRepository";




export class RoomRepository implements
    CreateRoomRepository,
    GetRoomByRoomIdRepository,
    GetRoomByIdRepository,
    UpdateRoomRepository {
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

    async getRoomById(id: GetRoomByIdRepository.Request): Promise<GetRoomByIdRepository.Response> {
        const collection = await RoomRepository.getCollection()
        const rawRoom = await collection.findOne({ _id: stringToObjectId(id) })
        return rawRoom && mapDocument(rawRoom)
    }

    async getRooms(params: GetRoomsRepository.Request): Promise<GetRoomsRepository.Response> {
        const collection = await RoomRepository.getCollection()
        const { page, paginationLimit } = params
        const offset = (page - 1) * paginationLimit
        const rawRooms = await collection.find({ deletedAt: null })
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

    async updateRoom(data: UpdateRoomRepository.Request): Promise<UpdateRoomRepository.Response> {
        const collection = await RoomRepository.getCollection()
        const { id } = data

        const filter = { _id: stringToObjectId(id) }

        const result = await collection.updateOne(filter, { $set: data })

        const raw = await collection.findOne(filter)

        return raw && mapDocument(raw)
    }
}