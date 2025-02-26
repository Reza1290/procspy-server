export type SessionDetailProps = {
    id: string
    sessionId: string
    deviceManufacturer?: string
    deviceModel?: string
    operatingSystem?: string
    operatingSystemVersion?: string
    cpuModel?: string
    gpuModel?: string
    ramSize?: string
    browser?: string
    browserVersion?: string
    ipAddress?: string
    macAddress?: string
    vpnDetected?: boolean
    countDisplays: number
    createdAt: string
    updatedAt?: string
}

export class SessionDetail {
    public readonly id: string
    public readonly sessionId: string
    public readonly deviceManufacturer?: string
    public readonly deviceModel?: string
    public readonly operatingSystem?: string
    public readonly operatingSystemVersion?: string
    public readonly cpuModel?: string
    public readonly gpuModel?: string
    public readonly ramSize?: string
    public readonly browser?: string
    public readonly browserVersion?: string
    public readonly ipAddress?: string
    public readonly macAddress?: string
    public readonly vpnDetected?: boolean
    public readonly countDisplays: number
    public readonly createdAt: string
    public readonly updatedAt?: string

    constructor(props: SessionDetailProps) {
        this.id = props.id
        this.sessionId = props.sessionId
        this.deviceManufacturer = props.deviceManufacturer
        this.deviceModel = props.deviceModel
        this.operatingSystem = props.operatingSystem
        this.operatingSystemVersion = props.operatingSystemVersion
        this.cpuModel = props.cpuModel
        this.gpuModel = props.gpuModel
        this.ramSize = props.ramSize
        this.browser = props.browser
        this.browserVersion = props.browserVersion
        this.ipAddress = props.ipAddress
        this.macAddress = props.macAddress
        this.vpnDetected = props.vpnDetected
        this.countDisplays = props.countDisplays
        this.createdAt = props.createdAt
        this.updatedAt = props.updatedAt
    }
}