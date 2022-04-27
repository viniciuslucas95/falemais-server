import { BadRequestException } from "../../errors/base/bad-request-exception.error"

export function validatePrice(price: any) {
    if (typeof price !== 'number') throw new BadRequestException('PriceMustBeANumber')
    if (isNaN(price)) throw new BadRequestException('PriceMustBeANumber')

    return price
}