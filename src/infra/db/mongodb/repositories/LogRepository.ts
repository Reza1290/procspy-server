import { Collection } from "mongodb";
import dbConnection from "../helpers/db-connection";
import { mapCollection, mapDocument, objectIdToString } from "../helpers/mapper";

import { CreateLogRepository } from "@application/interfaces/repositories/logs/CreateLogRepository"
import { GetLogsBySessionIdRepository } from "@application/interfaces/repositories/logs/GetLogsBySessionIdRepository";
import { GetLogsByRoomIdRepository } from "@application/interfaces/repositories/logs/GetLogsByRoomIdRepository";
import { EnrichedLog } from "@application/interfaces/use-cases/logs/GetLogsByRoomIdInterface";




export class LogRepository implements
    CreateLogRepository,
    GetLogsBySessionIdRepository,
    GetLogsByRoomIdRepository {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('logs')
    }

    async createLog(logData: CreateLogRepository.Request): Promise<CreateLogRepository.Response> {
        const collection = await LogRepository.getCollection()
        const { insertedId } = await collection.insertOne({ ...logData, timestamp: new Date() })
        return objectIdToString(insertedId)
    }

    async getLogsBySessionId(params: GetLogsBySessionIdRepository.Request): Promise<GetLogsBySessionIdRepository.Response> {
        const collection = await LogRepository.getCollection()
        const { sessionId, page, paginationLimit } = params
        const offset = (page! - 1) * paginationLimit!
        const rawLogs = await collection.aggregate([
            {
                $match: {
                    "sessionId": sessionId
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $skip: offset
            },
            {
                $limit: Number(paginationLimit)
            },
            {
                $lookup: {
                    from: "flags",
                    localField: "flagKey",
                    foreignField: "flagKey",
                    as: "flag"
                }
            },
            {
                $unwind: { path: "$flag", preserveNullAndEmptyArrays: true }
            }])
            .toArray()

        const logs = mapCollection(rawLogs)
        const total = await collection.countDocuments({ sessionId })
        const totalPages = Math.ceil(total / paginationLimit)

        return {
            data: logs,
            page,
            total,
            totalPages,
        };
    }

    async getLogsByRoomId(params: GetLogsByRoomIdRepository.Request): Promise<GetLogsByRoomIdRepository.Response> {
        const collection = await LogRepository.getCollection();
        const { roomId, page, paginationLimit } = params
        const limitNum = Number(paginationLimit)
        const offset = (page - 1) * paginationLimit;
        const pipeline: Array<any> = [
            {
                $addFields: {
                    sessionIdObj: { $toObjectId: "$sessionId" }
                }
            },
            {
                $lookup: {
                    from: "sessions",
                    localField: "sessionIdObj",
                    foreignField: "_id",
                    as: "session"
                }
            },
            {
                $unwind: { path: "$session", preserveNullAndEmptyArrays: true }
            },
            {
                $match: {
                    "session.roomId": roomId
                }
            },
            {
                $sort: { timestamp: -1 }
            },
            {
                $skip: offset
            },
            {
                $limit: limitNum
            },
            {
                $lookup: {
                    from: "flags",
                    localField: "flagKey",
                    foreignField: "flagKey",
                    as: "flag"
                }
            },
            {
                $unwind: { path: "$flag", preserveNullAndEmptyArrays: true }
            },
        ];
        const enrichedLogs = await collection.aggregate(pipeline).toArray() as EnrichedLog[];
        const countPipeline = [
            {
                $addFields: {
                    sessionIdObj: { $toObjectId: "$sessionId" }
                }
            },
            {
                $lookup: {
                    from: "sessions",
                    localField: "sessionIdObj",
                    foreignField: "_id",
                    as: "session"
                }
            },
            {
                $unwind: "$session"
            },
            {
                $match: {
                    "session.roomId": roomId
                }
            },
            {
                $count: "total"
            }
        ];

        const countResult = await collection.aggregate(countPipeline).toArray();
        const total = countResult[0]?.total ?? 0;

        const totalPages = Math.ceil(total / paginationLimit);

        return {
            data: enrichedLogs,
            page,
            total,
            totalPages,
        };
    }
}