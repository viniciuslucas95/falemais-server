import { BadRequestException } from "./base/bad-request-exception.error";

export class DddBadRequestException extends BadRequestException {
    constructor() {
        super('DddBadRequestException', 'Cannot exist a tariff with both ddds being equals')
    }
}