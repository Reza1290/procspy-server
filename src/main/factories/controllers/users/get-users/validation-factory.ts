import { Validation } from "../../../../../infra/http/interfaces/Validation";
import { EmailValidation } from "../../../../../infra/http/validations/EmailValidation";
import { RequiredFieldValidation } from "../../../../../infra/http/validations/RequiredFieldValidation";
import { ValidationComposite } from "../../../../../infra/http/validations/ValidationComposite";
import { EmailvalidatorAdapter } from "../../../../../infra/http/validators/EmailValidatorAdapter";

export const makeGetUsersValidation = ():ValidationComposite => {
    return new ValidationComposite([
        
      ], 'body')
}