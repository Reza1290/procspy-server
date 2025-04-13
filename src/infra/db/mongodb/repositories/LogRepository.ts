import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapCollection, mapDocument, objectIdToString } from "../helpers/mapper";

import { CreateLogRepository } from "@application/interfaces/repositories/logs/CreateLogRepository"
import { GetLogsBySessionIdRepository } from "@application/interfaces/repositories/logs/GetLogsBySessionIdRepository";




export class LogRepository implements
    CreateLogRepository,
    GetLogsBySessionIdRepository {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('logs')
    }

    async createLog(logData: CreateLogRepository.Request): Promise<CreateLogRepository.Response> {
        const collection = await LogRepository.getCollection()
        const { insertedId } = await collection.insertOne({ ...logData, timestamp: new Date() })
        return objectIdToString(insertedId)
    }

    async getLogsBySessionId(sessionId: GetLogsBySessionIdRepository.Request): Promise<GetLogsBySessionIdRepository.Response> {
        const collection = await LogRepository.getCollection()
        const rawLogs = await collection.find({ sessionId })
            // .sort({ timestamp: 1 })
            .toArray()

        const logs = mapCollection(rawLogs)

        return logs
    }
}