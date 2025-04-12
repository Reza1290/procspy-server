export enum SessionStatus {
    Scheduled,
    Ongoing,
    Completed,
    Paused
}

export type SessionProps = {
    id: string
    roomId: string
    // socketId: string
    proctoredUserId: string
    startTime?: string
    endTime?: string
    status?: SessionStatus
}

export class Session {
    public readonly id: string
    public readonly roomId: string
    // public readonly socketId: string
    public readonly proctoredUserId: string
    public readonly startTime?: string
    public readonly endTime?: string
    public readonly status?: SessionStatus

    constructor(props: SessionProps) {
        this.id = props.id
        this.roomId = props.roomId
        // this.socketId = props.socketId
        this.proctoredUserId = props.proctoredUserId
        this.startTime = props.startTime
        this.endTime = props.endTime
        this.status = props.status
    }
}


