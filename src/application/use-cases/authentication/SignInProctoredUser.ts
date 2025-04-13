import { SessionNotExistError } from "@application/errors/SessionNotExistError"
import { GetProctoredUserByIdRepository } from "@application/interfaces/repositories/proctored-users/GetProctoredUserByIdRepository"
import { GetSessionByTokenRepository } from "@application/interfaces/repositories/sessions/GetSessionByTokenRepository"
import { SignInProctoredUserInterface } from "@application/interfaces/use-cases/authentication/SignInProctoredUserInterface"


export class SignInProctoredUser implements SignInProctoredUserInterface {
    constructor(
        private readonly getSessionByTokenRepository: GetSessionByTokenRepository,
        private readonly getProctoredUserByIdRepository: GetProctoredUserByIdRepository
    ) { }

    async execute(credentials: SignInProctoredUserInterface.Request): Promise<SignInProctoredUserInterface.Response> {
        const {token} = credentials

        console.log(token)
        const session =  await this.getSessionByTokenRepository.getSessionByToken(token)
        if(!session){
            return new SessionNotExistError()
        }

        const user = await this.getProctoredUserByIdRepository.getProctoredUserById(session.proctoredUserId)
        console.log(user)
        if(!user) {
            return new SessionNotExistError()
        }
        
        return {
            session,
            user
        }

    }
}