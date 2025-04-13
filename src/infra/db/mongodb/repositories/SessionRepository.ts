import { CreateSessionRepository } from "@application/interfaces/repositories/sessions/CreateSessionRepository"
import dbConnection from "../helpers/db-connection"
import { Collection, Timestamp } from "mongodb"
import { mapCollection, mapDocument, objectIdToString, stringToObjectId } from "../helpers/mapper"
import { GetSessionsByProctoredUserIdRepository } from "@application/interfaces/repositories/sessions/GetSessionsByProctoredUserIdRepository"
import { GetSessionByIdRepository } from "@application/interfaces/repositories/sessions/GetSessionByIdRepository"
import { GetActiveSessionsByProctoredUserIdRepository } from "@application/interfaces/repositories/sessions/GetActiveSessionsByProctoredUserIdRepository"
import { GetSessionByTokenRepository } from "@application/interfaces/repositories/sessions/GetSessionByTokenRepository"
import { Session } from "@domain/entities/Session"

function generateToken(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

async function isTokenDuplicate(collection: Collection, token: string): Promise<boolean> {
    const existingSession = await collection.findOne({ token });
    return !!existingSession;
}

export class SessionRepository implements
    CreateSessionRepository,
    GetSessionsByProctoredUserIdRepository,
    GetSessionByIdRepository,
    GetActiveSessionsByProctoredUserIdRepository,
    GetSessionByTokenRepository {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('sessions')
    }

    private async createUniqueToken(): Promise<string> {
        const collection = await SessionRepository.getCollection();
        let token = generateToken(8);
        while (await isTokenDuplicate(collection, token)) {
            token = generateToken(8);
        }
        return token;
    }

    async createSession(sessionData: CreateSessionRepository.Request): Promise<CreateSessionRepository.Response> {
        const collection = await SessionRepository.getCollection();
        const token = await this.createUniqueToken();
        console.log(token)
        const { insertedId } = await collection.insertOne({ ...sessionData, token, createdAt: new Date() });
        return objectIdToString(insertedId);
    }


    async getSessionsByProctoredUserId(params: GetSessionsByProctoredUserIdRepository.Request): Promise<GetSessionsByProctoredUserIdRepository.Response> {
        const collection = await SessionRepository.getCollection()
        const { proctoredUserId, page, paginationLimit } = params
        const offset = (page - 1) * paginationLimit
        const rawSessions = await collection.find({ proctoredUserId }).sort({ createdAt: -1 })
            .skip(offset)
            .limit(paginationLimit)
            .toArray()
        const total = await collection.countDocuments({})
        const totalPages = Math.ceil(total / paginationLimit)
        const sessions = mapCollection(rawSessions)

        return {
            data: sessions, page, total, totalPages,
        };
    }

    async getSessionById(id: GetSessionByIdRepository.Request): Promise<GetSessionByIdRepository.Response> {
        const collection = await SessionRepository.getCollection()
        const _id = stringToObjectId(id)
        const rawSession = await collection.findOne({ _id })
        return rawSession && mapDocument(rawSession)
    }

    async getActiveSessionsByProctoredUserId(proctoredUserId: GetActiveSessionsByProctoredUserIdRepository.Request): Promise<GetActiveSessionsByProctoredUserIdRepository.Response> {
        const collection = await SessionRepository.getCollection()
        const rawSessions = await collection.find({ proctoredUserId, status: { $in: [0, 1, 2] } }).toArray()

        const sessions = mapCollection(rawSessions)
        return sessions
    }

    async getSessionByToken(token: GetSessionByTokenRepository.Request): Promise<GetSessionByTokenRepository.Response> {
        const collection = await SessionRepository.getCollection()
        const rawSession = await collection.findOne({ token })

        return rawSession && mapDocument(rawSession)
    }




}