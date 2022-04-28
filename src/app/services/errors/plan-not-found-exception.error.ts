import { NotFoundException } from "../../errors/base/not-found-exception.error";


export class PlanNotFoundException extends NotFoundException {
    constructor() {
        super('PlanNotFound')
    }
}