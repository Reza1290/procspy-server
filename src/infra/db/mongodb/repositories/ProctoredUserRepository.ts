import { CreateProctoredUserRepository } from "@application/interfaces/repositories/proctored-users/CreateProctoredUserRepository"
import { GetProctoredUserByIdentifierRepository } from "@application/interfaces/repositories/proctored-users/GetProctoredUserByIdentifierRepository"
import { GetProctoredUsersRepository } from "@application/interfaces/repositories/proctored-users/GetProctoredUsersRepository"
import { GetProctoredUsers } from "@application/use-cases/proctored-users/GetProctoredUsers"
import { mapCollection, mapDocument, objectIdToString } from "../helpers/mapper"
import dbConnection from "../helpers/db-connection"
import { Collection } from "mongodb"



export class ProctoredUserRepository implements
    CreateProctoredUserRepository,
    GetProctoredUserByIdentifierRepository,
    GetProctoredUsersRepository {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('proctored_users')
    }

    async createProctoredUser(userData: CreateProctoredUserRepository.Request): Promise<CreateProctoredUserRepository.Response> {
        const collection = await ProctoredUserRepository.getCollection()
        const { insertedId } = await collection.insertOne({ ...userData, createdAt: new Date() })
        return objectIdToString(insertedId)
    }


    async getProctoredUserByIdentifier(identifier: GetProctoredUserByIdentifierRepository.Request): Promise<GetProctoredUserByIdentifierRepository.Response> {
        const collection = await ProctoredUserRepository.getCollection()
        const rawProctoredUser = await collection.findOne({ identifier })
        return rawProctoredUser && mapDocument(rawProctoredUser)
    }

    async getProctoredUsers(params: GetProctoredUsersRepository.Request): Promise<GetProctoredUsersRepository.Response> {
        const collection = await ProctoredUserRepository.getCollection()
        const { page, paginationLimit } = params
        const offset = (page - 1) * paginationLimit
        const rawProctoredUsers = await collection.find({})
            .sort({ createdAt: -1 })
            .skip(offset)
            .limit(paginationLimit)
            .toArray()

        const sessions = mapCollection(rawProctoredUsers)

        const total = await collection.countDocuments({})
        const totalPages = Math.ceil(total / paginationLimit)
        return {
            data: sessions, page, total, totalPages,
        };
    }
}