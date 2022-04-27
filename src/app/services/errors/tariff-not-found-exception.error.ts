import { NotFoundException } from "../../errors/base/not-found-exception.error";

export class TariffNotFoundException extends NotFoundException {
    constructor() {
        super('TariffNotFound')
    }
}