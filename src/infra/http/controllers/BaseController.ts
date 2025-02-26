

export abstract class BaseController{
    constructor(private readonly validation?: Validaton){}

    abstract execute(httpRequest: HttpRequest)
}