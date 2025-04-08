export type LogProps = {
    id: string
    sessionId: string
    message: string
    timestamp: string
    flagKey?: string | null
}

export class Log {
    public readonly id: string
    
    public readonly sessionId: string

    public readonly message: string

    public readonly timestamp: string

    public readonly flagKey?: string | null

    constructor(props: LogProps){
        this.id = props.id
        this.sessionId = props.sessionId
        this.message = props.message
        this.timestamp = props.timestamp
        this.flagKey = props.flagKey
    }
}