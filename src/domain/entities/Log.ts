export type LogProps = {
    id: string
    sessionId: string
    attachment?: string
    timestamp: string
    flagKey?: string | null
}

export class Log {
    public readonly id: string
    
    public readonly sessionId: string

    public readonly timestamp: string
    
    public readonly attachment?: string

    public readonly flagKey?: string | null

    constructor(props: LogProps){
        this.id = props.id
        this.sessionId = props.sessionId
        this.attachment = props.attachment
        this.timestamp = props.timestamp
        this.flagKey = props.flagKey
    }
}