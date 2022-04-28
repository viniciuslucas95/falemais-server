import { BadRequestException } from "../../errors/base/bad-request-exception.error"
import { Validator } from "./validator"

export class NameValidator implements Validator<string> {
    constructor(public key: string) { }

    validate(value: unknown): string {
        if (typeof value !== 'string') throw new BadRequestException(`${this.key}MustBeAString`)
        if (value.length === 0) throw new BadRequestException(`${this.key}CannotBeEmpty`)

        return value
    }
}