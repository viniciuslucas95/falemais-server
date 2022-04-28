import { ConflictException } from "../../errors/base/conflict-exception.error";


export class PlanConflictException extends ConflictException {
    constructor() {
        super('PlanNameAlreadyExists')
    }
}