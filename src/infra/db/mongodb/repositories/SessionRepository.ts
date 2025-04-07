import { CreateSessionRepository } from "@application/interfaces/repositories/sessions/CreateSessionRepository"
import dbConnection from "../helpers/db-connection"
import { Collection, Timestamp } from "mongodb"
import { mapDocument, objectIdToString } from "../helpers/mapper"
import { GetSessionByProctoredUserIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByProctoredUserIdRepository"



export class SessionRepository implements
    CreateSessionRepository,
    GetSessionByProctoredUserIdRepository
    {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('sessions')
    }

    async createSession(sessionData: CreateSessionRepository.Request): Promise<CreateSessionRepository.Response> {
        const collection = await SessionRepository.getCollection()
        const { insertedId } = await collection.insertOne({ ...sessionData, startTime: new Date() , createdAt: new Date() })
        return objectIdToString(insertedId)
    }


    async getSessionByProctoredUserId(proctoredUserId: GetSessionByProctoredUserIdRepository.Request): Promise<GetSessionByProctoredUserIdRepository.Response> {
        const collection = await SessionRepository.getCollection()
        const rawSession = await collection.findOne({ proctoredUserId })
        return rawSession && mapDocument(rawSession)
    }
    

    // async getSessions(params: GetSessionsRepository.Request): Promise<GetSessionsRepository.Response> {
    //     const collection = await SessionRepository.getCollection()
    //     const { page, paginationLimit } = params
    //     const offset = (page - 1) * paginationLimit
    //     const rawSessions = await collection.find({})
    //         .sort({ createdAt: -1 })
    //         .skip(offset)
    //         .limit(paginationLimit)
    //         .toArray()

    //     const sessions = mapCollection(rawSessions)

    //     const total = await collection.countDocuments({})
    //     const totalPages = Math.ceil(total / paginationLimit)
    //     return {
    //         data: sessions, page, total, totalPages,
    //     };
    // }
}