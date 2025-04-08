import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapDocument, objectIdToString } from "../helpers/mapper";

import { CreateLogRepository } from "@application/interfaces/repositories/logs/CreateLogRepository"




export class LogRepository implements
    CreateLogRepository
    {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('logs')
    }

    async createLog(logData: CreateLogRepository.Request): Promise<CreateLogRepository.Response> {
        const collection = await LogRepository.getCollection()
        const { insertedId } = await collection.insertOne({...logData, timestamp: new Date()})
        return objectIdToString(insertedId) 
    }

    
}