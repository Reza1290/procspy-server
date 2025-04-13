import { SignInProctoredUserInterface } from "@application/interfaces/use-cases/authentication/SignInProctoredUserInterface";
import { SignInInterface } from "../../../../application/interfaces/use-cases/authentication/SignInInterface";
import { BcryptAdapter } from "../../../../infra/cryptography/BcryptAdapter";
import { JWTAdapter } from "../../../../infra/cryptography/JWTAdapter";
import env from "../../../config/env";
import { ProctoredUserRepository } from "@infra/db/mongodb/repositories/ProctoredUserRepository";
import { SignInProctoredUser } from "@application/use-cases/authentication/SignInProctoredUser";
import { SessionRepository } from "@infra/db/mongodb/repositories/SessionRepository";

export const makeSignInProctoredUser = (): SignInProctoredUserInterface => {
    const userRepository = new ProctoredUserRepository()
    const sessionRepo = new SessionRepository()
    return new SignInProctoredUser( sessionRepo, userRepository)
}