import { BadRequestException } from "../../errors/base/bad-request-exception.error"

export function validateDdd(ddd: any) {
    if (typeof ddd !== 'number') throw new BadRequestException('DddMustBeANumber')
    if (ddd <= 0) throw new BadRequestException('InvalidDdd', 'It must be a positive number (1+)')

    return ddd
}