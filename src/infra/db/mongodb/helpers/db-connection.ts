import { Collection, MongoClient } from "mongodb";

class DbConnection{
    private connectionString?:string

    private client?:MongoClient


    async connect(connectionString: string){
        this.connectionString = connectionString
        this.client = new MongoClient(connectionString)
        await this.client.connect()
    }

    async disconnect(){
        await this.client?.close()
        this.client = undefined

    }

    async getCollection(collectionName:string): Promise<Collection>{
        if(!this.client && this.connectionString){
            await this.connect(this.connectionString)
        }
        const db = this.client?.db()
        if(!db){
            throw new Error('Please Connect The Database (Database not Connected)')
        }
        return db.collection(collectionName)
    }


}

export default new DbConnection()