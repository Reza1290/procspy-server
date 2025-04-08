export type GlobalSettingProps = {
    id: string
    key: string
    value: number

}

export class GlobalSetting {
    public readonly id: string
    public readonly key: string
    public readonly value: number

    constructor(props: GlobalSettingProps){
        this.id = props.id
        this.key = props.key
        this.value = props.value
    }
}