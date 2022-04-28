import { BadRequestException } from "../../errors/base/bad-request-exception.error";
import { Validator } from "./validator";

export class PositiveNumberValidator implements Validator<number> {
    constructor(public key: string) { }

    validate(value: unknown): number {
        if (typeof value !== 'number') throw new BadRequestException(`${this.key}MustBeANumber`)
        if (isNaN(value)) throw new BadRequestException(`${this.key}MustBeANumber`)
        if (value < 0) throw new BadRequestException(`${this.key}MustBePositive`)

        return value
    }
}