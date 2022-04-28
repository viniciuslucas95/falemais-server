import { BadRequestException } from "../../../errors/base/bad-request-exception.error"
import { Validator } from "../../helpers/validator"

export class DddValidator implements Validator<number>{
    constructor(public key: string) { }

    validate(value: unknown): number {
        if (typeof value !== 'number') throw new BadRequestException(`${this.key}MustBeANumber`)
        if (value <= 0) throw new BadRequestException(`Invalid${this.key}`, 'It must be a positive number (1+)')

        return value
    }
}