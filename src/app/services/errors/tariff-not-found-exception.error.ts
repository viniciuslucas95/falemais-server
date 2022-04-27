import { NotFoundException } from "../../errors/not-found-exception.error";

export class TariffNotFoundException extends NotFoundException {
    constructor() {
        super('TariffNotFound')
    }
}