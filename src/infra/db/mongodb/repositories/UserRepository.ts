import { Collection } from "mongodb";
import { CreateUserRepository } from "../../../../application/interfaces/repositories/authentication/CreateUserRepository";
import { GetUserByEmailRepository } from "../../../../application/interfaces/repositories/authentication/GetUserByEmailRepository";
import dbConnection from "../helpers/db-connection";
import { mapDocument, objectIdToString } from "../helpers/mapper";




export class UserRepository implements
    CreateUserRepository,
    GetUserByEmailRepository {
    static async getCollection(): Promise<Collection> {
        return dbConnection.getCollection('users')
    }

    async createUser(userData: CreateUserRepository.Request): Promise<CreateUserRepository.Response> {
        const collection = await UserRepository.getCollection()
        const { insertedId } = await collection.insertOne({...userData, createdAt: new Date()})
        return objectIdToString(insertedId) 
    }

    async getUserByEmail(email: GetUserByEmailRepository.Request): Promise<GetUserByEmailRepository.Response> {
        const collection = await UserRepository.getCollection()
        const rawUser = await collection.findOne({email})
        return rawUser && mapDocument(rawUser)
    }
}