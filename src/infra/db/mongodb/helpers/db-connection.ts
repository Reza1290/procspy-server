import { Collection, MongoClient } from "mongodb";

class DbConnection {
    private connectionString?: string

    private client?: MongoClient


    async connect(connectionString: string) {
        this.connectionString = connectionString
        this.client = new MongoClient(connectionString)
        await this.client.connect()
    }

    async disconnect() {
        await this.client?.close()
        this.client = undefined

    }

    async getCollection(collectionName: string): Promise<Collection> {
        if (!this.client && this.connectionString) {
            await this.connect(this.connectionString)
        }
        const db = this.client?.db()
        if (!db) {
            throw new Error('Please Connect The Database (Database not Connected)')
        }
        return db.collection(collectionName)
    }

    async migration() {
        if (!this.client && this.connectionString) {
            await this.connect(this.connectionString);
        }
        const collectionMigrations = this.getCollection('migrations')
        const collection = this.getCollection('flags');
        const migrationKey = 'initial-flags-seed';

        const alreadyMigrated = await (await collectionMigrations).findOne({ key: migrationKey });
        const flags = [
            { flagKey: "CONNECT", label: "User Connected", severity: 0 },
            { flagKey: "DISCONNECT", label: "User Disconnected", severity: 1 },
            { flagKey: "SWITCH_TAB", label: "User Switched Tab", severity: 3 },
            { flagKey: "MINIMIZE_WINDOW", label: "User Minimized or Resized Exam Window", severity: 4 },
            { flagKey: "CLOSED_EXAM_TAB", label: "User Manually Closed Exam Tab", severity: 8 },
            { flagKey: "USED_SHORTCUT", label: "User Used Shortcut", severity: 2 },
            { flagKey: "MULTIPLE_TABS", label: "Multiple Browser Tabs Opened", severity: 7 },
            { flagKey: "EXIT_FULLSCREEN", label: "User Exited Fullscreen Mode", severity: 6 },
            { flagKey: "MULTIPLE_MONITORS", label: "Multiple Monitors Detected", severity: 5 },
            { flagKey: "UNAUTHORIZED_DEVICE", label: "Unauthorized Device Connected", severity: 9 },
            { flagKey: "VM_DETECTED", label: "Virtual Machine Detected", severity: 8 },
            { flagKey: "EMULATOR_DETECTED", label: "Emulator Detected", severity: 8 },
            { flagKey: "SCREEN_RECORDING", label: "Screen Recording Software Detected", severity: 7 },
            { flagKey: "REMOTE_ACCESS", label: "Remote Access Software Detected", severity: 9 },
            { flagKey: "NETWORK_CHANGE", label: "User Switched Wi-Fi/VPN/IP Mid-Session", severity: 4 },
            { flagKey: "CONNECTION_LOST", label: "Internet Connection Lost", severity: 6 },
            { flagKey: "HIGH_PACKET_LOSS", label: "High Packet Loss Detected", severity: 5 },
            { flagKey: "HIGH_LATENCY", label: "Network Latency Above Acceptable Threshold", severity: 5 },
            { flagKey: "VIDEO_FEED_LOST", label: "Webcam Feed Lost or Turned Off", severity: 7 },
            { flagKey: "VIDEO_MANIPULATION", label: "Fake Webcam Software Detected", severity: 8 },
            { flagKey: "MIC_MUTE", label: "Microphone Muted Unexpectedly", severity: 3 },
            { flagKey: "STOP_PROCTORING", label: "User Completed the Test", severity: 0 },
        ];

        await (await collection).deleteMany({});

        await (await collection).insertMany(flags);
        await (await collectionMigrations).insertOne({
            key: migrationKey,
            appliedAt: new Date(),
        });
        console.log('Migration completed: Flags inserted.');
    }



}

export default new DbConnection()