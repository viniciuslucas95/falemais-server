import { BadRequestException } from "../../errors/base/bad-request-exception.error";

export class EmptyBodyException extends BadRequestException {
    constructor() {
        super('BodyCannotBeEmpty')
    }
}